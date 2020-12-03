import React, { Component, Fragment} from 'react'
import Header from './include/header.js';
import { sideBar } from "./include/sidebar"; //侧边栏
import {galleryList} from './pages/gallery'
import {PostInfo} from "./pages";
import {getPostLisst, getcbpdes, getpostfoot, getnextprev, gallerycompare, getCommentNum, getcommentsList, tofollows, showPostList, getTagList, getPhotoList, getPages} from './utils/commens.js' //获取博客信息
import { BootCommons, isMobile, Loading, random, geturl, checkNull, getLastbrackval, HtmlEncode, linkmao, Icons} from './utils/utils.js'
const {ctx, colorChars, userdefaultAvatars, currentUrl} = BootCommons;  //isInMaintain:显示的页面  false 博客页面  true 维护页面

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogInfo: false,
            whichpage:{},
            postList:[],
        }
    }
    componentWillMount(){
        let {blogInfo}=this.props; //获取用户信息
        let {whichpage}=blogInfo;
        let postList=getPostLisst(whichpage);
        
        
        this.setState({
            blogInfo:blogInfo,
            whichpage:whichpage,
            postList:postList,
        })

    }
    componentDidMount() {
        $("#page_begin_html").addClass("autohtight")
        let $this=this;
        let {blogInfo, whichpage, postList}=this.state;
        const {webpages, subPages}=whichpage;
        const {blogTitle,  isadmin}=blogInfo;
        switch (webpages) {
            case "index": 
                const currentPage=geturl("page")==""?1:parseInt(geturl("page"))
                geturl("page")!=""?$(document).attr("title", $(document).attr("title").replace("随笔列表第"+currentPage+"页 - ","")):""; //修改标题
                const pageMain=getPages(); //获取分页
                $(".forFlow").html('').addClass("postlist-main");
                $("#home").show();
                sideBar(blogInfo) //加载侧边栏  if(!isMobile){}
                $(".forFlow").append(showPostList(postList))
                
                pageMain!=""?$(".forFlow").append(`<div class="page-content">${pageMain}</div>`):"";
            break;
            case "list":
                let pageType="";
                let entrylistTitle="";
                if(subPages==="postList" || subPages==="articlesList"){
                    pageType=subPages =="articlesList"?"文章分类":subPages =="postList"?"随笔分类":"";
                    entrylistTitle=$(".forFlow").find(".entrylistTitle").html().replace("随笔分类 -","");
                    
                }else if(subPages==="allList" || subPages==="tagPostlist"){ //所有列表
                    entrylistTitle=$(".forFlow").find(".PostListTitle").html().replace(/(^\s*)|(\s*$)/g, "");
                }else if(subPages==="diaryList"){
                    entrylistTitle=$(".forFlow").find(".PostListTitle").html().replace(/(^\s*)|(\s*$)/g, "");
                }else{
                    entrylistTitle=$(".forFlow").find(".entrylistTitle").html().replace(/(^\s*)|(\s*$)/g, "");
                }
                // 分页
                let list_pagemain=getPages(); //获取分页;
                
                $(".forFlow").html(`
                        <h1 class="postlistTitle" data-type="${pageType}">${entrylistTitle}</h1>
                `).addClass("postlist-main");
                // $(document).attr("title",$(document).attr("title").replace("随笔分类 -",""));  //设置浏览器标题
                $("#home").show();
                sideBar(blogInfo) //加载侧边栏
                // pager

                $(".forFlow").append(showPostList(postList))

                if(list_pagemain && list_pagemain!=""){
                    $(".forFlow").append(`<div class="page-content">${list_pagemain}</div>`)
                }
                
            break;
            case "tag":
                $("#home").show();
                sideBar(blogInfo) //加载侧边栏
                $("#MyTag1_dtTagList").before('<div class="white boxsizing tagMain"></div>');
                getTagList();// 获取显示所有tag列表
                $('.forFlow').delegate('#tags_orderby_usecount, #tags_orderby_name', 'click', function() { 
                    setTimeout(() => {
                        getTagList();// 获取显示所有tag列表
                    }, 200);

                })

            break;
            case "commentsList":
                $("#home").show();
                sideBar(blogInfo) //加载侧边栏
                $(".forFlow").attr("id","commentsList");
                $(".forFlow >.pager:first").hide();
                for(let i=0; i<$(".forFlow").find(".PostList").length;i++){
                    let $this=$(".forFlow").find(".PostList:eq("+i+")");
                    //获取文章其他信息
                    var metaInfo = $this.find(".postDesc2").html().replace(/(^\s*)|(\s*$)/g, "");
                    let title=$this.find(".postTitl2").html();
                    let users=metaInfo.split(" ")[0];
                    let date = metaInfo.split(" ")[1]; //获取日期
                    let time = metaInfo.split(" ")[2]; //获取时间  
                    let objs={users,date,time}

                    $this.find(".postTitl2").html(`
                        <span class="commentsList_avatar"><img src="${userdefaultAvatars}" /></span>
                        <span>${users}</span>
                        <span class="commentsList_date">${date} ${time}</span>
                    `)
                    $this.find(".postText2").after(`
                        <div class="item-bots">
                            <div class="commentRe">${title}</div>
                           
                        </div>
                    `)
                }

            break;
            case "info":
            
            break;
            case "diaryInfo": //日志详情
                $("#home").show();
                sideBar(blogInfo) //加载侧边栏
                var postTitle=$(".postTitle2").html();
                $(".postTitle").html(postTitle);
                //获取文章其他信息
                var articleObject={}
                var postDate=$("#post-date").html()
                articleObject.date = postDate.split(" ")[0]; //获取日期
                articleObject.time = postDate.split(" ")[1]; //获取时间
                articleObject.editLink = $(".postDesc a").length>1?$(".postDesc a:eq(1)").attr("href"):$(".postDesc a:eq(0)").attr("href");//获取编辑
                var addToWzs=$(".postDesc a").length>1?$(".postDesc a:last").attr("onclick"):"";
                articleObject.AddToWz=addToWzs || ""
                articleObject.readCount=$("#post_view_count").html();
                articleObject.commentCount=$("#post_comment_count").html();
                $(".postTitle").after(`
                    <div class="post-bots">
                        <span class="date">
                            ${articleObject.date} 
                        </span>
                        <span class="postCategorys">${!isMobile?"分类:":""}<em><a href="${ctx}/MyDiary.html">我的日志</a></em></span>
                        ${blogInfo.isadmin?`<span class="edit"><a href="${articleObject.editLink}" target="_blink">编辑</a></span>`:``}
                    </div>
                `)
                $("#blog_post_info, #comment_form").hide();
            break;
            case "photolist": //相册列表
                let galleryArry=getPhotoList();
                var xc_title=$("#main").find(".thumbTitle").html();
                var xctitle1=$(document).attr("title");//获取页面标题
                var xctitle=xctitle1.replace(blogTitle,xc_title+" - 相册 - "+blogTitle);	
                $(document).attr("title",xctitle);
                $("#articleTitle").html(xc_title)
                $(".thumbTitle").after(`
                    <div class="galleryMain" id="galleryMains">
                    </div>
                `)
                galleryList(galleryArry, blogInfo)
                sideBar(blogInfo) //加载侧边栏
            break;
            case "photoinfo":
                sideBar(blogInfo) //加载侧边栏
                var documentTitle=$(document).attr("title");//获取页面标题
                $(document).attr("title","图片详情-"+documentTitle);
                $(".gallery").attr("id","gallery_info")
                $(".gallery").wrapInner(`<div class="gallery_img"></div>`)
                let title=$(".galleryTitle").html().replace(/(^\s*)|(\s*$)/g, "");
                let backlist_src=$("#ViewPicture1_ReturnUrl").attr("href");
                let src=$("#ViewPicture1_OriginalImage").attr("href");  //target="_New"
                $(".gallery_img").before(`
                    <div class="gallery_Title">
                        <h1>${title}</h1>
                        <div class="gallery_Title_r">
                            <span><a href="${backlist_src}"><i class="iconfont icon-liebiao"></i>返回列表</a></span>
                            <span><a href="${src}" target="_New"><i class="iconfont icon-fangda"></i>查看原图</a></span>
                        </div>
                    </div>
                    
                `)
            break;
            default:
                sideBar(blogInfo) //加载侧边栏
            break;
        }
        $("#home").show();
        // console.log('blogInfo:',blogInfo);
    }
    render() {
        let {blogInfo, whichpage}=this.state;
        const {webpages, subPages}=whichpage;
        return (
            <Fragment>
                <Header blogInfo={blogInfo}/>
                {
                    webpages==="index"?
                        ""
                    : webpages==="info"?
                    <PostInfo blogInfo={blogInfo}/>
                    :
                    ""
                }
            </Fragment>
        )
    }
}
