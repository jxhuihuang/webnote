/*详情页面  */
import React, { Component, Fragment } from 'react'
import { sideBar } from "../../include/sidebar"; //侧边栏

import { getnextprev,  getCommentNum, tofollows} from '../../utils/commens.js' //获取博客信息
import { BootCommons, isMobile, linkmao, ajaxFa, checkNull, getLastbrackval, getDateDiff} from '../../utils/utils.js'
const {ctx, currentUrl, userdefaultAvatars} = BootCommons;  //isInMaintain:显示的页面  false 博客页面  true 维护页面
import './index.less'
export default class PostInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogInfo: {},
            commentNum:0,
        } 
    }
    componentWillMount() {
        let blogInfo=this.props.blogInfo;
        let $this=this;
        const {subPages}=blogInfo.whichpage;
        this.setState({blogInfo});
        $("#home").addClass("post_info_home")
        $("#home").show();
        sideBar(blogInfo) //加载侧边栏
        let postTitle=$(".postTitle2").html();
        $(".postTitle").html(postTitle);
        //获取文章其他信息
        let articleObject={}
        var postDate=$("#post-date").html()
        articleObject.date = postDate.split(" ")[0]; //获取日期
        articleObject.time = postDate.split(" ")[1]; //获取时间
        articleObject.editLink = $(".postDesc a").length>1?$(".postDesc a:eq(1)").attr("href"):$(".postDesc a:eq(0)").attr("href");//获取编辑
        let addToWzs=$(".postDesc a").length>1?$(".postDesc a:last").attr("onclick"):"";
        articleObject.AddToWz=addToWzs || ""
        articleObject.readCount=$("#post_view_count").html();
        articleObject.commentCount=$("#post_comment_count").html();
        $(".postTitle").after(`
            <div class="post-bots">
                <span class="date">
                    ${articleObject.date} 
                </span>
                <span class="postCategorys">${!isMobile?"分类:":""}<em></em></span>
                <span class="bots_read ${isMobile?`iconspan`:``}" ><em id="post_view_count">${articleObject.readCount}</em>${isMobile?`阅`:`阅读`}</span>
                <span class="bots_comment  ${isMobile?`iconspan`:``}"><a href="#comments"><em>${articleObject.commentCount}</em>${isMobile?`评`:`评论`}</a></span>
                ${blogInfo.isadmin?`<span class="edit"><a href="${articleObject.editLink}" target="_blink">编辑</a></span>`:``}
            </div>
        `)
         //获取标签分类
        this.getCategoriesTags(blogInfo).then((datas)=>{
            if(datas.category && datas.category.name){
                let categorys=datas.category;
                $(".postCategorys em").append(`
                    <a href="${categorys.link}">${categorys.name}</a>
                `)
            }
            if(datas.entryTag.length>0){
                let entryTagArry=datas.entryTag || []
                $("#blog_post_info_block").before(`<div class="post_tag"><label><i class="iconfont icon-label" title="标签"></i></label></div>`)
                entryTagArry.map((TagObjs,k)=>{
                    var name=TagObjs.name;
                    var href=TagObjs.link
                    $(".post_tag").append(`
                        <a href="${href}">${name}</a>
                    `)
                })

            }
        })
        $("#green_channel_weibo, #green_channel_wechat").wrapAll(`<span class="shares"></span>`)
        if(isMobile){
            $(".shares").prepend(`<label>分享：</label>`)
        }
        /***赞反对 */
        $(".diggit").attr("title","推荐")
        $(".buryit").attr("title","反对")
        if(!isMobile && blogInfo.isadmin){
            $(".buryit").after(`<div class="dig-editLink"><a  href="${articleObject.editLink}" target="_blink"><i class="iconfont icon-bianji3"/>编辑</a></div>`)
        }

        //获取上一篇下一篇
        let nextprev=getnextprev() 
        let {prev, next}=nextprev
        if(!prev && !next){
            $("#post_next_prev").hide();
        }
        if(prev || next){
            if(!isMobile){
                $("#post_next_prev").html("");
                $("#post_next_prev").append(`
                    ${prev?`<a class="prevPost" title="上一篇" href="${prev.link}">${prev.title}</a>`:''}
                    ${next?`<a class="nextPost" title="下一篇" href="${next.link}">${next.title}</a>`:''}
                `)
            }else{
                $("#post_next_prev").hide();
            }
        }
        //获取作者信息
        if(isMobile){
            setTimeout(() => {
                let avatars=$(".author_avatar").attr("src") || "";
                $("#post_next_prev").before(`
                    <div class="postUserInfo">
                        <div class="postUser_avatar"><a class="news_avatar_box" href="https://home.cnblogs.com/u/${blogInfo.blogApp}"><img src="${avatars}" /></a></div>
                        <div class="postUserInfo_main">
                            <div class="postUserInfo_content">
                                <P class="postUserInfo_name">${blogInfo.admin_name}</P>
                                <P class="postUserInfo_subTitle"><span>${blogInfo.blogSubTitle}</span></p>
                            </div>
                            <div class="btn-postUserInfo">
                                <div class="postUserInfo_followsbox">${blogInfo.follows?"已关注":`<i class="iconfont icon-zj addfollowicon"></i>关注`}</div>
                            </div>
                        </div>
                    </div>
                `)
                $('#post_detail').delegate('.postUserInfo_followsbox', 'click', function() { 
                    tofollows(blogInfo).then(function(s){
                        let follows=s=="关注成功"?true:s=="取消关注成功"?false:""
                            if(follows){
                                $(".postUserInfo_followsbox").html("已关注").addClass("hasfollow");
                            }else{
                                $(".postUserInfo_followsbox").html(`<i class="iconfont icon-zj addfollowicon"></i>关注`).removeClass("hasfollow");
                            }
                    })
                });
            }, 500);
        }
        /*************************评论*******************************/
        /***************评论列表 ************/
        if(subPages =="diaryInfo"){
            $("#comment_form").hide()
        }
        let refreshcomment_onclick=$("#comment_nav").find("#lnk_RefreshComments").attr("onclick")
        $("#blog-comments-placeholder").before(`<a name="comments"></a>`)
        
        /*获取评论数*/
        getCommentNum(cb_entryId).then(function(count){
            $(".bots_comment em").html(count)
            if(count>0){
                $("#comment_form_container").after(`
                    <div class="comments-list-main" id="comments-mains" name="comments-mains">
                        <div id="commentform_title">
                            <span class="comment_num_box">全部评论 <em class="comment_num">${count}</em>条</span>
                            <!--<span class="refresh_btn"><a href="javascript:void(0);" onclick="${refreshcomment_onclick}" id="lnk_RefreshComment" runat="server" clientidmode="Static">刷新评论</a></span>-->
                        </div>
                        <div id="comment_allLists"></div>
                    </div>
                `)
                $this.getcommentsList(cb_entryId); //获取显示列表;
                if(currentUrl.indexOf("#comments")>0){
                    linkmao("comments-mains")
                }
            }else{
                if(currentUrl.indexOf("#comments")>0){
                    linkmao("commentform") 
                }
            }
            $this.setState({
                commentNum:count
            })

            
        })
        /*评论输入框*/
        if($("#tbCommentBody").length>0){
            $("#comment_form_container").before(`<div id="commentform_title"><span class="comment_num_box">我要评论</span></div>`)
            $("#tbCommentBody").attr("placeholder","写下你的评论…")
            $("#commentbox_opt").prepend(`
                <div class="submitTip">
                    <P></p>
                </div>
            `)
            if($("#tip_comment2").next("p")[0]){
                $("#tip_comment2").next("p").addClass("hide")
                let submitTip=$("#tip_comment2").next("p").html();
                $(".submitTip p").html(submitTip);
            }
        }
        
        let comment_htmls=$("#comment_form_container").html() || ""
        if(comment_htmls.indexOf("评论功能已被禁用")>0){
            $("#comment_form_container").wrapInner('<div class="comment_disable_box"></div>')
            $("#comment_form_container").addClass("comment_disable")
        }
        // 未登录
        if($(".login_tips").length>0){
            $("#comment_form_container").before(`<div id="commentform_title"><span class="comment_num_box">我要评论</span></div>`)
            $(".login_tips").addClass("commentbox_main")
            $(".login_tips").html(`
                <div class="login_tips_content">
                    发表评论请 <a rel="nofollow" href="javascript:void(0);" class="underline tologin" onclick="return login('commentform');">登录</a>
                </div>
            `)
            $(".login_tips").after(`
                <p id="commentbox_opt">
                    <span></span>
                    <input id="btn_comment_submit" type="button" class="comment_btn" title="提交评论(Ctrl + Enter)" value="提交评论" onclick="return login('commentform');">
                </p>
            `)
        }
        /*****点击事件 */
        $("#btn_comment_submit").on("click",function(){
            setTimeout(() => {
                $this.getcommentsList(cb_entryId);
                getCommentNum(cb_entryId).then(function(count){
                    $(".commentform_title .comment_num em").html(count)
                    $(".bots_comment em").html(count);
                    $(".comment_num").html(count);
                })
            }, 1000);
        })
        
        //跳转评论锚点
        $('body').delegate('a[href="#comments"]', 'click', function(event) { 
            event = event || window.event;
            event.preventDefault(); //阻止a标签的默认行为
            if($("[name='comments-mains']").length>0){
                linkmao("comments-mains")
            }else{
                linkmao("commentform")
            }
           
            
        })
    }




    //获取标签分类
    getCategoriesTags=(blogInfo)=>{
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: ctx + "/ajax/CategoriesTags.aspx",
                type: "get",
                contentType: "application/json; charset=utf-8",
                data: {
                    blogId: blogInfo.blogId,
                    postId: cb_entryId 
                },
                cache: !1,
                dataType: "text",
                timeout: 1e4,  
                success: function(n) {
                    const infoData = $("<code></code>").append($(n));
                    let categoriesTags={}
                    if($(infoData).find("#BlogPostCategory").length>0){
                        const category_name=$(infoData).find("#BlogPostCategory a").html().replace(/(^\s*)|(\s*$)/g, "") || "";
                        const category_href=$(infoData).find("#BlogPostCategory a").attr("href") || "";
                        categoriesTags.category={name:category_name, link:category_href}
                    }
                    let EntryTagArry=[]
                    if($(infoData).find("#EntryTag").length>0){
                        $(infoData).find("#EntryTag a").each(function(){
                            var name=$(this).html();
                            var href=$(this).attr("href")
                            EntryTagArry.push({name:name,link:href})
                        })
                    }
                    categoriesTags.entryTag=EntryTagArry;
                    resolve(categoriesTags)
                }
            })
        })

    }
    /******详情页获取评论列表 */
    getcommentsList=(postId)=>{
        const $this = this
        return new Promise(function (resolve, reject) {
            let blogInfoObj = {};
            // $("#blog-comments-placeholder").length>0?$("#blog-comments-placeholder").remove():"";
            ajaxFa.call($this, {}, (data) => {
                const comments = $("<code></code>").append($(data.replace(/\<script.*?\>/g, "")));
                if($(comments).find(".feedbackNoItems").length>0){
                    let commentsData=[];
                    $("#comment_allLists").html(`<div class="comment_allLists_main"></div>`);
                    for(let i=0; i<$(comments).find(".feedbackItem").length;i++){
                        let  $this=$(comments).find(".feedbackItem:eq("+i+")");
                        let commentsId=!checkNull($this.find(".layer").attr("href"))?$this.find(".layer").attr("href").replace("#",""):"";
                        if(commentsId==""){
                            return false;
                        }
                        let lay=$this.find(".layer").html().replace("#","");
                        let comment_date=$this.find(".comment_date").html();
                        let comment_avatar=$this.find("#comment_"+commentsId+"_avatar").html();
                        comment_avatar=comment_avatar?comment_avatar.replace(/(^\s*)|(\s*$)/g, ""):userdefaultAvatars;
                        let comment_userName=$this.find("#a_comment_author_"+commentsId).html()
                        let comment_link=$this.find("#a_comment_author_"+commentsId).attr("href")
                        let comment_content="";
                        let blockquote_length=$this.find(".feedbackCon .blog_comment_body").find("blockquote").length;
                        if($this.find(".feedbackCon .blog_comment_body").find("blockquote").length>0){
                            for(var k=0; k<blockquote_length; k++){
                                var $str=$this.find(".feedbackCon .blog_comment_body").find("blockquote").eq(k);
                                let feedback_user=$str.prev().html()
                                
                                if($str.prev().find("a").length>0){
                                    let feedback_clicks=$str.prev().find("a").attr("onclick")
                                    let feedback_href=$str.prev().find("a").attr("href")
                                    let values=feedback_user.replace(/\<.*?\>.*?\<\/.*?\>/g, "");
                                    feedback_user=`<a href="${feedback_href}" title="查看所引用的评论" onclick="${feedback_clicks}">${values}</a>`

                                }else{
                                    feedback_user=feedback_user.replace("@","")
                                }
                                $str.prepend(`<p class="feedback_header">${feedback_user}</P>`)
                                $str.prev().css("display","none")
                                
                            }
                            comment_content=$this.find(".feedbackCon .blog_comment_body").html();
                        }else if($this.find(".feedbackCon .blog_comment_body p a").length>0){
                            let blog_comment_body=$this.find(".feedbackCon .blog_comment_body p").html().replace(/(^\s*)|(\s*$)/g, "");
                            let re_values=blog_comment_body.replace(/\<.*?\>.*?\<\/.*?\>(.*?)\<.*?\>(.*?)/g,"$2");
                              let splits=blog_comment_body.split("<br>")[0]
                              let re_user=splits.replace(/\<.*?\>.*?\<\/.*?\>(.*?)/g,"$1");
                              let feedback_clicks=$this.find(".feedbackCon .blog_comment_body p a").attr("onclick")
                              let feedback_href=$this.find(".feedbackCon .blog_comment_body p a").attr("href")
                                comment_content=`
                                    <div class="reply_content">
                                        <p>回复 <a href="${feedback_href}" title="查看所回复的评论" onclick="${feedback_clicks}">${re_user}</a>：</p>
                                        <span>${re_values}</span>
                                    </div>
                                `;
                        }else{
                            comment_content=$this.find(".feedbackCon .blog_comment_body").html();
                        }
                        let comment_actions=$this.find(".comment_actions").html(); //回复、引用等按钮
                        let comment_vote=$this.find(".comment_vote").html(); //支持、反对 按钮
                        let digg_click=$this.find(".comment_digg").attr("onclick");
                        let burry_click=$this.find(".comment_burry").attr("onclick");
                        let digg_html=$this.find(".comment_digg").html().replace(/(^\s*)|(\s*$)/g, "");
                        let digg_num=getLastbrackval(digg_html) || "0";
                        let burry_html=$this.find(".comment_burry").html().replace(/(^\s*)|(\s*$)/g, "");
                        let burry_num=getLastbrackval(burry_html) || "0";
                        let islouzhu=$this.find(".louzhu").length>0?true:false;
                        let objs={lay, comment_date, comment_avatar, comment_userName, comment_link, comment_content, comment_actions, comment_vote, islouzhu, digg_click, burry_click, digg_html, digg_num, burry_html, burry_num}
                        commentsData.push(objs)
                        
                        
                        $(".comment_allLists_main").prepend(`
                        <div class="comments_item" >
                            <div class="comment_body" id="comment_anchor_${commentsId}" blockquote_length="${blockquote_length}">
                                <div class="feedbackListSubtitle">
                                    <a name="${commentsId}" id="comment_anchors_${commentsId}"></a>
                                </div>
                                <div class="comments_left">
                                    <div class="comments_avatar">
                                        <img src="${comment_avatar}"/>
                                    </div>

                                </div>
                                <div class="comments_mian">
                                    <div class="comments_title">
                                    <div class="comments_users">
                                        <a href="${comment_link}" target="_blank">${comment_userName} ${islouzhu?'<em>博主</em>':''}</a></div>
                                        ${isMobile?`
                                            <div class="comments_action">
                                                <span class="comment_vote_box"> 
                                                    <span class="comment_error" style="color: red"></span>
                                                    <a href="javascript:void(0);" class="comment_digg" onclick="${digg_click}"><i class="iconfont icon-zan" ></i>${digg_num==="0"?"赞":digg_num}</a>
                                                    <a href="javascript:void(0);" class="comment_burry" onclick="${burry_click}"><i class="iconfont icon-zan1" ></i>${burry_num==="0"?"踩":burry_num}</a>
                                                </span>
                                            </div>
                                        `:""}
                                    </div>
                                    <div class="comments_contents" id="comment_body_${commentsId}">
                                        ${comment_content}
                                    </div>
                                    <div class="comments_footer">
                                        <div class="comments_date">
                                            <!--<span class="comments_lay">${lay}</span>-->
                                            <span>${getDateDiff(comment_date)}</span>
                                        </div>
                                        <div class="comments_action">
                                            <span class="comments_actions_box"> ${comment_actions}</span> 
                                            ${!isMobile ? `<span class="comment_vote_box">${comment_vote}</span>`:""}
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    `)
                    }
                    resolve(commentsData)
                }
            }, ctx + "/ajax/GetComments.aspx?postId="+postId+"&pageIndex=1&anchorCommentId=0",{dataType:"text", types:"GET",})
        })
    }
    showCommentsList=(commentsList)=>{


    }
    render(){
        return (
            <Fragment></Fragment> 
        );
    }
};