/*  判断是哪个页面  */ 
import {BootCommons, getcurrentUrl, removeNull, checkNull, isContain } from './utils'


const Whichpage = (url = BootCommons.currentUrl) => {
    let _url = url;
    _url=getcurrentUrl(_url);
    const blogApp = BootCommons.blogApp;
    let webpages = "";
    let pagesName = "default";
    let pageurl = blogApp != "" ? removeNull(_url.split(blogApp)[1]) : _url;
    if (pageurl != "" && pageurl != "/") {
        pageurl = _url.split(blogApp + "/")[1]
        var webpageIndexOf = pageurl.indexOf("/");
        if (webpageIndexOf == "-1") {
            pagesName = pageurl.split(".")[0];
        } else {
            pagesName = pageurl.split("/")[0];
        }
    }
    checkNull(pagesName) == "" ? "default" : pagesName;
    let subPages = "";
    switch (pagesName) {
        case "default": //主页
            webpages = "index";
            subPages = "index";
        break;
        case "category": //文章、随笔 列表
            webpages = "list";
            subPages = "postList";
            if($("#main .entrylistItem").length>0){
                let entrylistHref=$("#main .entrylistItem .entrylistItemTitle").attr("href");
                if(isContain(entrylistHref,"articles")){
                    subPages = "articlesList"
                }else{
                    subPages = "postList"
                }
            }
        break;
        case "p":  //随笔详情
            let posttle=_url.split("/p")[1]
            if(posttle.indexOf("/")==0){
                posttle=posttle.substring(posttle.indexOf("/")+1,posttle.indexOf("."))
            }
            if(posttle.indexOf(".")>0){
                posttle=posttle.substring(0+1,posttle.indexOf("."))
            }
            if(posttle==""){
                webpages = "list";
                subPages = "allList";
            }else{
                let reg = /^([1-9]\d*|[0]{1,1})$/
                if(reg.test(posttle)){ //数字
                    webpages = "info";
                    subPages = "postInfo";
                }else{   //非数字
                    if(posttle==="links"){
                        webpages = "links";
                        subPages = "links";
                    }else{
                        webpages = "info";
                        subPages = "postInfo";
                    }
                }
            }
        break;
        case "articles":  //文章详情
            webpages = "info";
            subPages = "articlesInfo"
        break;
        case "MyDiary": //日记列表
            webpages = "list";
            subPages = "diaryList"
        break;
        case "diary": //日记详情
            webpages = "diaryInfo";
            subPages = "diaryInfo"
        break;
        case "archive":   //随笔档案
            var archivetitle = _url.split("archive/")[1];
            let archivetitle_len=archivetitle.split("/").length;
            if(archivetitle_len>2){  //详情
                webpages = "info";
                subPages = "postInfo";

            }else{
                webpages = "list";
                subPages=pagesName;
            }
        break;
        case "archives":  //文章档案
            var archivetitles = _url.split("archives/")[1];
            let archivetitles_len=archivetitles.split("/").length;
            if(archivetitles_len>2){  //详情
                webpages = "info";
                subPages = "articlesInfo";
            }else{
                webpages = "list";
                subPages=pagesName;
            }
        break;
        case "tag":  //标签页
            var tagwich = _url.split("tag")[1].replace(/\s/g, '');
            if (tagwich == "" || tagwich == "/") {
                webpages = "tag";
                subPages = "allTag"  //所有标签
            }
            if (tagwich != "" && tagwich != "/") {
                webpages = "list";
                subPages = "tagPostlist"  //标签的文章或随笔列表
            }
            break;
        case "gallery": // 相册
            var wharchive1 = _url.split("gallery/")[1];
            if (wharchive1.indexOf("/") == "-1") {
                webpages = "photolist";
                subPages = "photolist";
            }
            if (wharchive1.indexOf("/") != "-1") {
                webpages = "photoinfo";
                subPages = "photoinfo"
            }
        break;
        case "RecentComments":  //评论列表
        case "MyComments":
            webpages = "commentsList";
            subPages = "commentsList"
        break;
        case "OtherPosts":
            webpages = "taglist";
            subPages = "OtherPosts"
            break;
        case "protected":  //密码保护文章、随笔详情
            webpages = "info";
            subPages = "protected"
        break;
        default:
            webpages = "none";
            subPages = "none"
    }
    const obj = { pagesName, webpages: webpages, subPages }
    return obj;
}

export default Whichpage