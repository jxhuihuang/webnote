// 获取博客数据方法
import React, { Component } from 'react'
import { BootCommons, ajaxFa, getLastbrackval, geturl, HtmlEncode, remLastbrackval, isMobile, removehttp, cutstr, removeNull, checkNull, getcurrentUrl, linkTo, isContain, stringSplit,Timestamp, random} from './utils.js'
import {message, Modal} from 'antd';
import {userinfo} from './json'
const { isLogin, isadmin, ctx, httpsType, currentUrl, avatar, bolgdefaultAvatars, userdefaultAvatars, loginAvatars, colorChars} = BootCommons;
const confirm =Modal.confirm;

/* 获取用户信息   */
function getBlogInfo() {
    const $this = this
    return new Promise(function (resolve, reject) {
        let blogInfoObj = {};
        ajaxFa.call($this, {}, (data) => {
            blogInfoObj.blogId=currentBlogId || "";   //博客id
            blogInfoObj.blogApp=currentBlogApp || ""; //博客后缀
            blogInfoObj.isLogin=isLogin;  //是否登录
            blogInfoObj.isadmin=isadmin;  //是否是博主
            var blogTitle = $("#Header1_HeaderTitle").html().replace(/\s/g, '');
            var blogSubTitle = $("#header #blogTitle h2").html().replace(/\s/g, '');
            const UserInfoData = $("<code></code>").append($(data.replace(/\<script.*?\>/g, "")));
            let getdata = $(UserInfoData).html().replace(/\s/g, '');
            let flows = getdata.substring(getdata.indexOf("('") + 2, getdata.indexOf("')"))
            const admin_name = $(UserInfoData).find("a:first").html().replace(/\s/g, '');
            let joinData = $(UserInfoData).find("a").eq(1).attr("title").split("入园时间：")[1];
            let joinTime = $(UserInfoData).find("a").eq(1).html().replace(/\s/g, '');
            let followers = $(UserInfoData).find("a").eq(2).html().replace(/\s/g, '');
            let followees = $(UserInfoData).find("a").eq(3).html().replace(/\s/g, '');
            followers = followers.indexOf("-") >= 0 ? followers.split("-")[1] : followers;
            followees = followees.indexOf("-") >= 0 ? followees.split("-")[1] : followees;
            $(document).attr("title", $(document).attr("title").replace(admin_name, blogTitle)); //修改标题 .replace("- 博客园", "")
            blogInfoObj.admin_name = admin_name;  //园主昵称
            blogInfoObj.blogUserGuid = flows;     // 关注Id
            blogInfoObj.joinData = joinData;      //入园日期
            blogInfoObj.joinTime = joinTime;      //园龄
            blogInfoObj.followers = followers;    //粉丝数
            blogInfoObj.followees = followees;    //关注数
            blogInfoObj.blogTitle = blogTitle;      //博客标题
            blogInfoObj.blogSubTitle = blogSubTitle;         //博客副标题
            blogInfoObj.blogAvatar=avatar?avatar:bolgdefaultAvatars;
            /****获取统计数 */
            if ($(".blogStats").length > 0) {
                let post_count = $(".blogStats").find("#stats_post_count").html().replace(/\s/g, '');
                blogInfoObj.post_count = parseInt(post_count.split("-")[1])  //随笔数
                let article_count = $(".blogStats").find("#stats_article_count").html().replace(/\s/g, '');
                blogInfoObj.article_count = parseInt(article_count.split("-")[1])  //文章数
                let comment_count = $(".blogStats").find("#stats-comment_count").html().replace(/\s/g, '');
                blogInfoObj.comment_count = parseInt(comment_count.split("-")[1]) //评论数
            }
            blogInfoObj.state=1;
            // 获取登录用户信息
            if (blogInfoObj.isLogin){
                blogInfoObj.username =isBlogOwner?admin_name:"";
                let userAvatar=userdefaultAvatars;
                if($("#nav_main .navbar-avatar").length>0){
                    userAvatar=$("#nav_main .navbar-avatar").attr("src") || userdefaultAvatars;
                    let user_blogAdress=$("#navblog-myblog-icon").attr("href") || "";
                    user_blogAdress=getcurrentUrl(user_blogAdress);
                    let user_BlogApp=user_blogAdress.indexOf("cnblogs.com/")>0?user_blogAdress.split("cnblogs.com/")[1]:"";
                    blogInfoObj.user_blogAdress=user_blogAdress;
                    blogInfoObj.user_BlogApp=user_BlogApp;
                }
                
                blogInfoObj.userAvatar=isBlogOwner?blogInfoObj.blogAvatar:userAvatar;
                resolve(blogInfoObj)
            } else {
                blogInfoObj.username = "";
                blogInfoObj.userAvatar=loginAvatars;
                resolve(blogInfoObj)
            }
            
            
        }, ctx + "/ajax/news.aspx",{
            dataType:"text",
            types:"GET",
            errors:(error)=>{
                error=error || "";
                console.log('blogInfo error:',error);
                resolve({state:0})
            }
        })
    })
}
function getUserInfo(){
    return new Promise(function (resolve, reject) {
        const timestamps=Timestamp()+random(5);
        $.ajax({
            type: "get",
            url: "https://account.cnblogs.com/user/userinfo?v="+timestamps,
            xhrFields: {
                withCredentials: !0
            },
            success: function(n) {
                resolve(n)
            },
            error: function() {
                
            }
        })
    })
        
}
/****获取侧边栏随笔分类** */
const getPostcategory=()=>{
    let $this=this;
    return new Promise(function (resolve, reject) {
        ajaxFa.call($this, {}, (data) => {
            const $str = $("<code></code>").append($(data.replace(/\<script.*?\>/g, "")));
            let postcategoryArry=[]
            if($str.find("#sidebar_postcategory").length>0){
                let $postcategory=$str.find("#sidebar_postcategory");
                for(let i=0; i<$postcategory.find("li").length;i++){
                    let  $_this=$postcategory.find("li:eq("+i+")");
                    let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                    let name=remLastbrackval(values);
                    let num=getLastbrackval(values); //获取最后括号的数字;
                    let link=$_this.find("a").attr("href");
                    name=name.replace(/(^\s*)|(\s*$)/g, "");
                    postcategoryArry.push({name, link, num})
                }
            }
            resolve(postcategoryArry) 
        }, ctx + "/ajax/sidecolumn.aspx",{dataType:"text", types:"GET",})
    })
}
function showsideMobile(event) {
    $("#sideBar").addClass("show-sideMobile")
    $("html,body, #home, #main, #mainContent").addClass("overflow_hidden")
}
function hidesideMobile(event) {
    $("#sideBar").removeClass("show-sideMobile")
    $("html,body, #home, #main, #mainContent").removeClass("overflow_hidden")
    setTimeout(() => {
        $('#sideBarMain').animate({ scrollTop: '0px' }, 20); 
    }, 300);
    
}

function getcbpdes(str) {
    let $this = str;
    let cbpdesData = {cbpdes:"", imgScr:"", type:"cbpdes", isAdminOnlyReader:"false"};

    if ($this.find(".c_b_p_desc").length > 0) {
        if($this.find(".c_b_p_desc  img").length>0){
            cbpdesData.imgScr=httpsType + removehttp($this.find(".c_b_p_desc  img:first").attr("src"));
        }
        let cbpdesHtml = $this.find(".c_b_p_desc").html() || "";
        let cbpdes = cbpdesHtml.replace("摘要：", "").replace(/\<a.*?\>.*?\<\/a\>/g, "").replace(/\<img.*?\>/g, "").replace(/(^\s*)|(\s*$)/g, "") ;
        cbpdes=cbpdes.includes("原文链接")?cbpdes.split("原文链接")[0].replace(/(^\s*)|(\s*$)/g, ""):cbpdes;
        if(cbpdes==="只有博主才能阅读该文。" || cbpdes==="只有博主才能阅读该文。"){
            console.log('cbpdes:',cbpdes);
            
            cbpdesData.isAdminOnlyReader="true";
        }
        cbpdesData.cbpdes=isMobile ? cutstr(cbpdes, 100) : cbpdes; //文章摘要
    }else if($this.find(".detail-content").length > 0 || $this.find(".cnblogs-post-body").length > 0){  //显示全文
        let postContent=$this.find(".detail-content").html() ||  $this.find(".cnblogs-post-body").html() || "";
        cbpdesData.cbpdes=postContent;
        cbpdesData.type="postbody"
    }
    return cbpdesData;
}

function getPostLisst(whichpage, blogInfo){
    const { webpages, subPages } = whichpage;
    let PostLisstObject = [];
    switch (subPages) {
        case "index":
            let dayLength=$(".forFlow").find(".day").length;
            $(".forFlow").find(".day").each(function(){
                let $this=$(this);
                let lengths=$this.find(".postTitle").length;
                if(lengths===1){
                    let objs={}
                    objs.title=$this.find(".postTitle span").html().replace(/(^\s*)|(\s*$)/g, "");
                    objs.link=$this.find(".postTitle a").attr("href").replace(/(^\s*)|(\s*$)/g, "");
                    // 获取摘要
                    let cbpdesObj=getcbpdes($this)
                    objs.cbpdes=cbpdesObj.cbpdes || "";
                    objs.cbpdes_img=cbpdesObj.imgScr|| "";
                    objs.cbpdes_type=cbpdesObj.type || "";
                    // 获取文章其他信息
                    let footInfo=getlistfootInfo($this.find(".postDesc"), whichpage);
                    objs.footInfo=footInfo || {};
                    // objs=Object.assign({},objs,footInfo)

                    if(blogInfo.isadmin){
                        PostLisstObject.push(objs)
                    }else{
                        cbpdesObj.isAdminOnlyReader!=="true"?PostLisstObject.push(objs):"" 
                    }
                }else if(lengths>1){
                    for(var i=0;i<$this.find(".postTitle").length; i++){
                        let $_this=$this.find(".postTitle").eq(i)
                        let objs1={}
                        objs1.title=$_this.find("span").html().replace(/(^\s*)|(\s*$)/g, "");
                        objs1.link=$_this.find("a").attr("href").replace(/(^\s*)|(\s*$)/g, "");
                        // 获取摘要
                        let cbpdesObj=getcbpdes($_this.next());
                        objs1.cbpdes=cbpdesObj.cbpdes || "";
                        objs1.cbpdes_img=cbpdesObj.imgScr|| "";
                        objs1.cbpdes_type=cbpdesObj.type || "";
                        let footInfobox=$_this.next().next().next();
                        // 获取文章其他信息
                        let footInfo=getlistfootInfo(footInfobox, whichpage);
                        objs1.footInfo=footInfo || {};
                        // objs1=Object.assign({},objs1,footInfo)

                        if(blogInfo.isadmin){
                            PostLisstObject.push(objs1)
                        }else{
                            cbpdesObj.isAdminOnlyReader!=="true"?PostLisstObject.push(objs1):""
                        }
                        
                    }
                }
            })
        break;
        case "postList":  //随笔列表
        case "articlesList": //文章列表
        case "archive": //随笔文档列表
        case "archives": //文章文档列表
            if($(".forFlow").find(".entrylistItem").length>0){
                for(let i=0; i<$(".forFlow").find(".entrylistItem").length;i++){
                    let  $this=$(".forFlow").find(".entrylistItem:eq("+i+")");
                    let objs={};
                    objs.title=$this.find(".entrylistItemTitle span").html().replace(/(^\s*)|(\s*$)/g, "");
                    objs.link=$this.find(".entrylistPosttitle a").attr("href").replace(/(^\s*)|(\s*$)/g, "");
                     // 获取摘要
                    let cbpdesObj=getcbpdes($this)
                    objs.cbpdes=cbpdesObj.cbpdes || "";
                    objs.cbpdes_img=cbpdesObj.imgScr|| "";
                    objs.cbpdes_type=cbpdesObj.type || "";
                    // 获取文章其他信息
                    let footInfo=getlistfootInfo($this.find(".entrylistItemPostDesc"), whichpage);
                    objs.footInfo=footInfo || {};

                    if(blogInfo.isadmin){
                        PostLisstObject.push(objs)
                    }else{
                        cbpdesObj.isAdminOnlyReader!=="true"?PostLisstObject.push(objs):"" 
                    }
                }
            }
        break;
        case "allList":  //所有列表
        case "tagPostlist":  //标签列表
        case "diaryList":    //日志列表
            if($(".forFlow").find(".PostList").length>0){
                for(let i=0; i<$(".forFlow").find(".PostList").length;i++){
                    let  $this=$(".forFlow").find(".PostList:eq("+i+")");
                    let objs={};
                    objs.title=$this.find(".postTitl2 span").html().replace(/(^\s*)|(\s*$)/g, "");
                    objs.link=$this.find(".postTitl2 a").attr("href").replace(/(^\s*)|(\s*$)/g, "");
                    // 获取文章其他信息
                    let footInfo=getlistfootInfo($this.find(".postDesc2"), whichpage);
                    objs.footInfo=footInfo || {};
                    PostLisstObject.push(objs)
                }
            }
        break;
    }
    return PostLisstObject;
}
// 显示列表
function showPostList(item=[]){
    if(!isMobile){
        let PostList=``
        item.map((obj,i)=>{
            PostList+=`
                <article>
                    <div class="post-mains">
                        <h3><a href="${obj.link}">${obj.title}</a></h3>
                        ${
                            obj.cbpdes_type==="postbody"?
                                `<div class="desc_body">${obj.cbpdes}</div>`
                            :
                                obj.cbpdes_img?
                                    `<div class="post-des ${obj.cbpdes_img?'text-overflow-2':'text-overflow-3'}">${obj.cbpdes}</div>`
                                :
                                    obj.cbpdes ? `<div class="post-des ${obj.cbpdes_img?'text-overflow-2':'text-overflow-3'}">${obj.cbpdes}</div>`:``
                        }
                        ${
                            Object.getOwnPropertyNames(obj.footInfo).length>0 ?
                            `
                                <div class="post-footer">
                                    <div>
                                        <span class="footer-datetime"><i class="iconfont icon-shijian1 shijian"></i>${(obj.footInfo).date}</span>
                                    </div>
                                    <div>
                                        ${(obj.footInfo).reads?`<span class="reads"><i class="iconfont icon-look  mr5"/><em>${(obj.footInfo).reads}</em> 人阅读 </span>`:''}
                                        ${(obj.footInfo).coments?`<span class="coments"><a href="${obj.link}#comments"><i class="iconfont icon-pinglun  mr5" /><em>${(obj.footInfo).coments}</em> 条评论</span></a>`:''}
                                        ${(obj.footInfo).diggs?`<span class="diggs"><span class="icon-box"><i class="iconfont icon-zan  mr5" /></span> <em> ${(obj.footInfo).diggs} </em> 赞</span>`:''}
                                        ${isadmin?`<span class="edits"><a href="${(obj.footInfo).editLink}" target="_blink"><i class="iconfont icon-bianji3  mr5" />编辑</a></span>`:``}
                                    </div>
                                </div>
                            `:``
                        }
                    </div>
                    ${
                        obj.cbpdes_img ?
                        `
                        <figure>
                            <img src="${obj.cbpdes_img}" />
                        </figure>
                        `:``
                    }
                </article>
            `
        })
        return PostList;
    }else{
        let mobilePostList=``;
        item.map((obj,i)=>{
            mobilePostList+=`
                <article>
                    <div class="post-mains">
                        <h3><a href="${obj.link}">${obj.title}</a></h3>
                        ${
                            obj.cbpdes_img?
                            `
                            <figure>
                                <img src="${obj.cbpdes_img}"/>
                            </figure>
                            `:``
                        }
                        ${obj.cbpdes ? `<div class="post-des ${obj.cbpdes_img?'text-overflow-2':'text-overflow-3'}">${obj.cbpdes}</div>`:``}
                        ${
                            Object.getOwnPropertyNames(obj.footInfo).length>0?
                            `
                                <div class="post-footer">
                                    <div>
                                        <span class="footer-datetime">${(obj.footInfo).date}</span>
                                        ${(obj.footInfo).reads?`<span class="reads"><em>${(obj.footInfo).reads}</em>阅</span>`:''}
                                        ${(obj.footInfo).coments?`<span class="coments"><a href="${obj.link}#comments"><em>${(obj.footInfo).coments}</em>评</a></span>`:''}
                                        ${(obj.footInfo).diggs?`<span class="diggs"><span class="icon-box"></span> <em> ${(obj.footInfo).diggs} </em>赞</span>`:''}
                                    </div>
                                    <div>
                                        ${isadmin?`<span class="edits"><a href="${(obj.footInfo).editLink}" target="_blink">编辑</a></span>`:``}
                                    </div>
                                </div>
                            `:``
                        }
                    </div>
                </article>
            `
        })
        return mobilePostList;
    }
}
//获取文章其他信息
function getlistfootInfo(str, whichpage) {
    let articleObject = {};
    let $this = str;
    const { webpages, subPages } = whichpage;
    switch (subPages) {
        case "index":
            var metaInfo =$this.html()?$this.html().replace(/\s/g, ";"):"";
            metaInfo=stringSplit(metaInfo, ";")
            articleObject.date = metaInfo[2]; //获取日期
            articleObject.time = metaInfo[3];//获取时间
            articleObject.users= metaInfo[4];//获取作者
            //获取阅读数 
            let readerVal=$this.find(".post-view-count").html() || "";
            articleObject.reads =getLastbrackval(readerVal) ; 
            //获取评论数
            const comentsVal=$this.find(".post-comment-count").html() || "";
            articleObject.coments = getLastbrackval(comentsVal);   
             //获取点赞数
            const diggVal=$this.find(".post-digg-count").html() || "";
            articleObject.diggs = getLastbrackval(diggVal);   
            articleObject.editLink =isadmin?$this.find("a").attr("href"):"";//获取编辑
        break;
        case "postList":
            let postList_dateTimes=$this.find("a[title='permalink']").html().replace(/(^\s*)|(\s*$)/g, "");
            metaInfo=stringSplit(postList_dateTimes, " ")
            articleObject.date=metaInfo[0]; //获取日期
            articleObject.time = metaInfo[1];//获取时间
            //获取阅读数 
            let postList_readerVal=$this.find(".post-view-count").html() || "";
            articleObject.reads =getLastbrackval(postList_readerVal) ; 
            //获取评论数
            const postList_comentsVal=$this.find(".post-comment-count").html() || "";
            articleObject.coments = getLastbrackval(postList_comentsVal);   
             //获取点赞数
            const postList_diggVal=$this.find(".post-digg-count").html() || "";
            articleObject.diggs = getLastbrackval(postList_diggVal);   
            articleObject.editLink =isadmin?$this.find("a:contains('编辑')").attr("href"):"";//获取编辑
        break;
        case "articlesList":
            let articlesList_dateTimes=$this.find("a[title='permalink']").html().replace(/(^\s*)|(\s*$)/g, "");
            metaInfo=stringSplit(articlesList_dateTimes, " ")
            articleObject.date=metaInfo[0]; //获取日期
            articleObject.time = metaInfo[1];//获取时间
            articleObject.editLink =isadmin?$this.find("a:contains('编辑')").attr("href"):"";//获取编辑
        break;
        case "archive":
            let archive_dateTimes=$this.find("a[title='permalink']").html().replace(/(^\s*)|(\s*$)/g, "");
            metaInfo=stringSplit(archive_dateTimes, " ")
            articleObject.date=metaInfo[0]; //获取日期
            articleObject.time = metaInfo[1];//获取时间
            //获取阅读数 
            let archive_readerVal=$this.find(".post-view-count").html() || "";
            articleObject.reads =getLastbrackval(archive_readerVal) ; 
            //获取评论数
            const archive_comentsVal=$this.find(".post-comment-count").html() || "";
            articleObject.coments = getLastbrackval(archive_comentsVal);   
             //获取点赞数
            const archive_diggVal=$this.find(".post-digg-count").html() || "";
            articleObject.diggs = getLastbrackval(archive_diggVal);   
            articleObject.editLink =isadmin?$this.find("a:contains('编辑')").attr("href"):"";//获取编辑
        break;
        case "archives":
            let archives_dateTimes=$this.find("a[title='permalink']").html().replace(/(^\s*)|(\s*$)/g, "");
            metaInfo=stringSplit(archives_dateTimes, " ")
            articleObject.date=metaInfo[0]; //获取日期
            articleObject.time = metaInfo[1];//获取时间
            //获取阅读数 
            let archives_readerVal=$this.find(".post-view-count").html() || "";
            articleObject.reads =getLastbrackval(archives_readerVal) ; 
            //获取评论数
            const archives_comentsVal=$this.find(".post-comment-count").html() || "";
            articleObject.coments = getLastbrackval(archives_comentsVal);   
             //获取点赞数
            const archives_diggVal=$this.find(".post-digg-count").html() || "";
            articleObject.diggs = getLastbrackval(archives_diggVal);   
            articleObject.editLink =isadmin?$this.find("a:contains('编辑')").attr("href"):"";//获取编辑
        break;
        case "allList":
        case "tagPostlist":
        case "diaryList":    //日志列表
            var allList_metaInfo =$this.html()?$this.html().replace(/\s/g, ";"):"";
            allList_metaInfo=stringSplit(allList_metaInfo, ";")
            
            articleObject.date = allList_metaInfo[1]; //获取日期
            articleObject.time = allList_metaInfo[2];//获取时间
            articleObject.users= allList_metaInfo[0];//获取作者
            //获取阅读数 
            let allList_readerVal=$this.find(".post-view-count").html() || "";
            articleObject.reads =allList_readerVal.split(":")[1] ; 
            //获取评论数
            const allList_comentsVal=$this.find(".post-comment-count").html() || "";
            articleObject.coments = allList_comentsVal.split(":")[1];   
             //获取点赞数
            const allList_diggVal=$this.find(".post-digg-count").html() || "";
            articleObject.diggs = allList_diggVal.split(":")[1];   
            articleObject.editLink =isadmin?$this.find("a:contains('编辑')").attr("href"):"";//获取编辑
        break;
    }
    return articleObject;
}
/***获取关注状态 */
function getFollowStatus(blogInfo){
    let $this=this;
    return new Promise(function (resolve, reject) {
        let {blogUserGuid, isLogin, isadmin}=blogInfo;
        if(!isLogin){
            resolve(false);
            return false;
        }
        if(isLogin &&  !isadmin){
            $.ajax({
                url: ctx + "/ajax/Follow/GetFollowStatus.aspx",
                data: {
                    blogUserGuid: blogUserGuid
                },
                cache: !1,
                dataType: "text",
                type: "get",
                success: function(n) {
                    const InfoData = $("<code></code>").append($(n.replace(/\<script.*?\>/g, "")));
                    var statusText=$(InfoData).find("a").html() || "";
                    let FollowStatus=false;
                    if(statusText!=""){
                        FollowStatus=statusText.indexOf("加关注")>0?false:statusText.indexOf('取消')>0?true:false;
                    }
                    resolve(FollowStatus)
                    // $this.setState({follows:FollowStatus});
                }
            }) 
        }
    })
}
//关注、取消关注
function tofollows(blogInfo, followState){
    return new Promise(function (resolve, reject) {
        // console.log('blogInfo:',blogInfo);
        let {isLogin, isadmin,}=blogInfo;
        if(!isLogin){
            linkTo("https://passport.cnblogs.com/login.aspx?ReturnUrl=" + currentUrl)
            return false;
        }
        if(isadmin){
            message.info("不能关注自己")
            return false;
        }
        if(followState==="true"){
            removeFollow(blogInfo,function(s){
                resolve(s)
            })
        }
        if(followState==="false"){
            addfollow(blogInfo,function(s){
                resolve(s)
            })
        }
    })
}
/***关注 */
function addfollow(blogInfo,callBack){
    callBack=callBack || function(){}
    let $this=this;
    // let {blogInfo}=this.state;
    let {blogUserGuid, isLogin, isadmin}=blogInfo;
    if(!isLogin){
        linkTo("https://passport.cnblogs.com/login.aspx?ReturnUrl=" + currentUrl)
        return false;
    }
    if(isadmin){
        message.info("不能关注自己")
        return false;
    }
    $.ajax({
        url: ctx +"/ajax/Follow/FollowBlogger.aspx",
        data: '{"blogUserGuid":"' + blogUserGuid + '"}',
        dataType: "text",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function(t) {
            message.info("关注成功")
            callBack("关注成功")
        },
        error: function(n) {
            n.status > 0 && message.info("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com")
        }
    })

}/***取消关注 */
function removeFollow(blogInfo, callBack){
    callBack=callBack || function(){}
    let $this=this;
    // let {blogInfo}=this.state;
    let {blogUserGuid}=blogInfo;
    confirm({
        title: '您确定要取消关注吗?',
        content: '',
        okText:"确认",
        cancelText:"取消",
        onOk() {
            $.ajax({
                url: ctx +"/ajax/Follow/RemoveFollow.aspx",
                data: '{"blogUserGuid":"' + blogUserGuid + '"}',
                dataType: "text",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function(n) {
                    if(n == "未登录"){
                        linkTo("https://passport.cnblogs.com/login.aspx?ReturnUrl=" + currentUrl)
                        return false;
                    }
                    message.info('取消关注成功',3,()=>{
                       
                    });
                    callBack("取消关注成功")
                },
                error: function(n) {
                    n.status > 0 && showFollowMsg("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com")
                }
            })
        },
        onCancel() {},
    });
}

// 获取显示所有tag列表
function getTagList(){
    let tagLists=[]
    let tr_length=$("#taglist").find("tr").length || 0;
    let td_length=$("#taglist").find("tr:first-child td").length || 0;
    for(let i=0; i<td_length; i++){
        for(let j=0; j<tr_length; j++){
            let $this=$("#taglist").find("tr:eq("+j+")").find("td:eq("+i+")")
            if($this.html()){
                const title=$this.find("a").html();
                const link=$this.find("a").attr("href");
                const num=getLastbrackval(HtmlEncode($this.find("span").html()));
                const bgColor=random(1,colorChars).toString();
                tagLists.push({title, link, num, bgColor})
            } 
        }
    }
    return tagLists
}
// function getTagList1(){
//     let tagList=[];
//     $("#taglist .tagMain").html("");
//     $.each($("#MyTag1_dtTagList td"), function (i, n) {
//         if(!checkNull($(this).find("a").html())){
//             const title=$(this).find("a").html();
//             const link=$(this).find("a").attr("href");
//             const num=getLastbrackval(HtmlEncode($(this).find("span").html()));
//             const bgColor=random(1,colorChars).toString();
//             $("#taglist .tagMain").append(`
//                 <span class="tagBox ant-tag" style="background-color:${bgColor}; border:transparent;"><a href="${link}" style="color:#FFF">${title} <em>(${num})</em></a></span>
//             `)
//             tagList.push({title,link,num,})
//         }
//     })
// }
//上一篇下一篇
function getnextprev() {
    var nextprevList = '';
    const nextprevArry = [];
    let prev = false;
    let next = false;
    var nextprevNum = $("#post_next_prev").find("a").length;
    if(nextprevNum<=0){
        return {}
    }
    if (nextprevNum > 0) {
        if (nextprevNum == 2) {
            var isnext = $(".p_n_p_prefix").html().replace(/\s/g, '');
            var nextprev = $("#post_next_prev a:eq(1)").html();
            var nextpreHref = $("#post_next_prev a:eq(1)").attr("href");
            if (isnext == "«") {
                prev = {
                    name: isnext == "«" ? "上一篇" : "下一篇",
                    title: nextprev,
                    link: nextpreHref,
                }

            } else {
                next = {
                    name: isnext == "«" ? "上一篇" : "下一篇",
                    title: nextprev,
                    link: nextpreHref,
                }
            }
        }
        if (nextprevNum > 2) {
            var prevs = $("#post_next_prev a:eq(1)").html();
            var prevslink = $("#post_next_prev a:eq(1)").attr("href");
            var nexts = $("#post_next_prev a:eq(3)").html();
            var nextlink = $("#post_next_prev a:eq(3)").attr("href");
            prev = {
                name: "上一篇",
                title: prevs,
                link: prevslink,
            }
            next = {
                name: "下一篇",
                title: nexts,
                link: nextlink,
            }

        }
        return { prev, next };
    }
}
/******获取评论数 */
function getCommentNum(cb_entryId) {
    const $this = this
    return new Promise(function (resolve, reject) {
        ajaxFa.call($this, {}, (count) => {
            resolve(count)
        },ctx + "/ajax/GetCommentCount.aspx?postId="+cb_entryId, {types:"GET"})
    })
}

function getPhotoList(){
    let lenths = $("#GalleryThumbNailViewer1_ThumbNails").find(".divPhoto").length;
    let photoList=[]
    for (let i = 0; i < lenths; i++) {
        let $this = $("#GalleryThumbNailViewer1_ThumbNails").find(".divPhoto:eq(" + i + ")");
        const photoSrc = $this.find("img").attr("src") ? httpsType + removehttp($this.find("img").attr("src").replace("t_", "o_")) : $this.find("img").attr("src");
        const photoHref = $this.find("a").attr("href");
        const title = $this.find("a").attr("title") || "";
        const id = (i + 1)
        let imgobjs = { href:photoHref, src:photoSrc, title, id:id }
        photoList.push(imgobjs)
    }
    return photoList;
}/**显示分页 */
function getPages(){
    const currentPage=geturl("page")|| "1";
    let $page_main="";
    if($(".forFlow").find(".Pager").length){
        $page_main=$(".forFlow").find(".Pager")
    }else if($(".forFlow").find(".topicListFooter").length>0){
        if($(".forFlow").find(".topicListFooter .pager").length>0){
            $page_main=$(".forFlow").find(".topicListFooter .pager")
        }else{
            $page_main=$(".forFlow").find(".topicListFooter")
        }
    }
    $page_main=$page_main || "";
    
    if($page_main!==""){
       if($page_main.find("#nav_next_page").length>0){
            
            if(isMobile){
                let nextpages=$(".topicListFooter").html() || "";
                // let current_pages=`<span class="current_page">${currentPage}</span>`
                let prepage='<a href="javascript:void(0)" class="disable">上一页</a>';
                const mob_pageLists=nextpages;
                return mob_pageLists;
            }else{
                const pageList=$(".topicListFooter").html() || "";
                return pageList;
            }
       }else{
            if(isMobile){
                let prePage_href=$page_main.find("a:contains('上一页')").attr("href") || "";
                let nextPage_href=$page_main.find("a:contains('下一页')").attr("href") || "";
                let prePage=prePage_href!==""?`<a href="${prePage_href}">上一页</a>`:'' ; //'<a href="javascript:void(0)" class="disable">上一页</a>';
                let current_pages=`<span class="current_page">${currentPage}</span>`
                let nextpage=nextPage_href!==""?`<a href="${nextPage_href}">下一页</a>`:'' ; //'<a href="javascript:void(0)" class="disable">下一页</a>';
                const mobile_pageList=prePage+nextpage;
                return mobile_pageList;
                
            }else{
                let pageLists=$page_main.html() || "";
                pageLists=pageLists.replace("···",`<span class="omit">···</span>`)
                pageLists=currentPage!==""?pageLists.replace(currentPage,`<span class="current_page">${currentPage}</span>`):pageLists;
                return pageLists;
            }
        }
    }else{
        return "";
    }
}
export {
    getBlogInfo,
    getUserInfo,
    getPostcategory,
    showsideMobile,
    hidesideMobile,
    getcbpdes,
    getPostLisst,
    getFollowStatus,
    tofollows,
    showPostList,
    getTagList,
    getnextprev,
    getCommentNum,
    getPhotoList,
    getPages,
}