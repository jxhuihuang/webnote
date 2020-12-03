
import React, { Component, Fragment} from 'react'
import { render } from 'react-dom';
import {  Tabs} from 'antd';
import {getBlogInfo, getPostcategory,hidesideMobile,  getFollowStatus, tofollows} from '../utils/commens' //获取博客信息
import {Icons, BootCommons, isMobile, ajaxFa, random, getLastbrackval, stringToArry, remLastbrackval, listserialnum, getNearEle} from '../utils/utils'
import './sidebar.less'
const {ctx, blogId, blogApp, colorChars, sizeChart, navList, postId, userdefaultAvatars, activity=[], archivePrivate} = BootCommons;  //isInMaintain:显示的页面  false 博客页面  true 维护页面
const { TabPane } = Tabs;

let sideBar=function(blogInfo){
    $("#sideBar").prepend(`
        ${
            isMobile?`
                <div class="sideModel-nav" >
                    <span class="sidenav-icon"><i class="iconfont icon--left" style="font-size:22px"}  title="返回"></i> </span>
                    <h2>导航</h2>
                </div>
            `:``
        }
        <div id="sideBar-mains"></div>
    `)
    $(".sidenav-icon").on("click",function(){
        hidesideMobile();
    })
    class SideBar extends Component {
        constructor(props) {
            super(props);
            this.state = {
                blogAvatar:"", 
                blogInfo:false,      
                followState:"false",   //关注状态
                followText:"已关注", //已关注  鼠标经过时 取消关注
                followers_num:"",    //粉丝数
                category:[],         //分类  包括随笔分类 和 文章分类
                calendarHtml:"",   //日历 
                zzkHtml:"",         //找找看
                catListLinks:[],      //常用链接
                toptags:[],          //标签
                newestPost:[],       //最新随笔
                scorerank:{},        //积分排名
                archives:[],         //档案 随笔档案 文章档案
                topviewedpost:[],    //阅读排行榜
                topcommentedpost:[],  //评论排行榜
                topdiggedpost:[],     //推荐排行榜
                recentcomment:[],     //最新评论
                imagecategory:[],     //相册
                links:[],             //链接
            } 
        }
        componentWillMount(){
            const $this=this;
            // const {whichpage}=blogInfo;
            if(!blogInfo.isadmin){
                getFollowStatus(blogInfo).then(function(FollowStatus){
                    let newfollowState=FollowStatus?"true":"false";
                    $this.setState({followState:newfollowState})
                })
            }
            this.setState({followers_num:blogInfo.followers})
            
            ajaxFa.call($this, {}, (data) => {
                const $str = $("<code></code>").append($(data.replace(/\<script.*?\>/g, "")));
                // 找找看
                if($str.find("#sidebar_search").length>0 && $str.find("#sidebar_search_box").length>0){
                    if( !isMobile){
                        let sidebar_search_html=$str.find("#sidebar_search_box").html() || "";
                        this.setState({
                            zzkHtml:sidebar_search_html,
                        },()=>{
                            $("#sideBarMain").find("#sidebar_search").remove();
                        })
                    }
                }
                /*****获取分类 */
                if($str.find("#sidebar_postcategory").length>0 || $str.find("#sidebar_articlecategory").length>0){
                     let categoryArry=[];
                    /*****获取随笔分类 */
                    if($str.find("#sidebar_postcategory").length>0){
                        let {category}=this.state;
                        let postcategoryArry=[];
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
                        categoryArry.push({title:"随笔分类",list:postcategoryArry})
                    }
                    /*****获取文章分类 *******/   
                    if($str.find("#sidebar_articlecategory").length>0){
                        let articlecategorys=[];
                        // archivePrivate blogInfo.isadmin?
                        let $articlecategorys=$str.find("#sidebar_articlecategory");
                        for(let i=0; i<$articlecategorys.find("li").length;i++){
                            let  $_this=$articlecategorys.find("li:eq("+i+")");
                            let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                            let name=remLastbrackval(values);
                            let num=getLastbrackval(values); //获取最后括号的数字;
                            let link=$_this.find("a").attr("href");
                            name=name.replace(/(^\s*)|(\s*$)/g, "");
                            articlecategorys.push({name, link, num})
                        }
                        if(!archivePrivate){
                            categoryArry.push({title:"文章分类",list:articlecategorys})
                        }else{
                            if(blogInfo.isadmin){
                                categoryArry.push({title:"文章分类",list:articlecategorys})
                            }
                        }
                    }
                    $this.setState({
                        category:categoryArry,
                    })
                }
                
                /*******常用链接 */
                
                if($str.find("#sidebar_shortcut").length>0){
                    let catListLinks=[];
                    let $shortcuts=$str.find("#sidebar_shortcut");
                    for(let i=0; i<$shortcuts.find("li").length;i++){
                        let  $_this=$shortcuts.find("li:eq("+i+")");
                        let  name=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                        let title=$_this.find("a").attr("title").replace(/(^\s*)|(\s*$)/g, "");
                        let link=$_this.find("a").attr("href");
                        name=name.replace(/(^\s*)|(\s*$)/g, "");
                        catListLinks.push({name, link, title})
                    }
                    
                    
                    $this.setState({
                        catListLinks:catListLinks,
                    })
                }
                /****标签 */
                
                if($str.find("#sidebar_toptags").length>0){
                    let toptagsArry=[];
                    let $toptags=$str.find("#sidebar_toptags");
                    for(let i=0; i<$toptags.find("li").length;i++){
                        let  $_this=$toptags.find("li:eq("+i+")");
                        let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "") || "";
                        // .replace(/\<.*?\>.*?\<\/.*?\>/g, "")
                        let name=values!=""?values.replace(/\<.*?\>.*?\<\/.*?\>/g, ""):"";
                        let numValue=$_this.find(".tag-count").html() || "";
                        let num=getLastbrackval(numValue);
                        // getLastbrackval($_this.html().replace(/<[^>]+>/g, "")); //获取最后括号的数字; 
                        let link=$_this.find("a").attr("href");
                        name=name.replace(/(^\s*)|(\s*$)/g, "");
                        const bgColor=random(1,colorChars).toString();
                        if(name!=="更多"){
                            toptagsArry.push({name, link, num, bgColor})
                        }
                    }
                    $this.setState({
                        toptags:toptagsArry,
                    })
                }
                /*****最新随笔 */
                
                if($str.find(".catListEssay").length>0){
                    let newestPostArray=[];
                    let $newestPost=$str.find(".catListEssay ul");
                    for(let i=0; i<$newestPost.find("li").length;i++){
                        let  $_this=$newestPost.find("li:eq("+i+")");
                        let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                        let title=listserialnum(values).title || "";
                        let num=listserialnum(values).num || "";
                        let link=$_this.find("a").attr("href");
                        newestPostArray.push({title, link, num})
                        // listserialnum
                    }
                    $this.setState({
                        newestPost:newestPostArray,
                    })

                }

                /****积分排名 */
                
                if($str.find("#sidebar_scorerank").length>0){
                    let scorerankArry={};
                    let $scorerank=$str.find("#sidebar_scorerank");
                    let liScore_String=$scorerank.find(".liScore").html().replace(/(^\s*)|(\s*$)/g, "");
                    let liScore=liScore_String.split("-")[1].replace(/(^\s*)|(\s*$)/g, "");
                    let liRank_String=$scorerank.find(".liRank").html().replace(/(^\s*)|(\s*$)/g, "");
                    let liRank=liRank_String.split("-")[1].replace(/(^\s*)|(\s*$)/g, "");
                    $this.setState({
                        scorerank:{liScore, liRank},
                    })
                }

                /*******获取档案 */
                if($str.find("#sidebar_postarchive").length>0 || $str.find("#sidebar_articlearchive").length>0){
                    // archives
                    let archiveArry=[]
                    /****随笔档案****/        
                    if($str.find("#sidebar_postarchive").length>0){
                        let postarchiveArry=[]  //postarchive
                        let $postarchive=$str.find("#sidebar_postarchive");
                        for(let i=0; i<$postarchive.find("li").length;i++){
                            let  $_this=$postarchive.find("li:eq("+i+")");
                            let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                            let name=remLastbrackval(values);
                            let num=getLastbrackval($_this.html().replace(/<[^>]+>/g, "")); //获取最后括号的数字; 
                            let link=$_this.find("a").attr("href");
                            name=name.replace(/(^\s*)|(\s*$)/g, "");
                            postarchiveArry.push({name, link, num});
                        }
                        archiveArry.push({title:"随笔档案",list:postarchiveArry})
                    }
                    /****文章档案****/
                    if($str.find("#sidebar_articlearchive").length>0){
                        let articlearchiveArry=[]  //postarchive
                        let $articlearchive=$str.find("#sidebar_articlearchive");
                        for(let i=0; i<$articlearchive.find("li").length;i++){
                            let  $_this=$articlearchive.find("li:eq("+i+")");
                            let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                            let name=remLastbrackval(values);
                            let num=getLastbrackval($_this.html().replace(/<[^>]+>/g, "")); //获取最后括号的数字; 
                            let link=$_this.find("a").attr("href");
                            name=name.replace(/(^\s*)|(\s*$)/g, "");
                            articlearchiveArry.push({name, link, num});
                        }
                        if(!archivePrivate){
                            archiveArry.push({title:"文章档案",list:articlearchiveArry})
                        }else{
                            if(blogInfo.isadmin){
                                archiveArry.push({title:"文章档案",list:articlearchiveArry})
                            }
                        }
                    }
                    $this.setState({
                        archives:archiveArry,
                    })

                }
                /****最新评论 */
                if($str.find("#sidebar_recentcomments").length>0){
                    let recentcommentsArry=[]  //postarchive
                    let $recentcomments=$str.find("#sidebar_recentcomments");
                    for(let i=0; i<$recentcomments.find(".recent_comment_title").length;i++){
                        let  $this=$recentcomments.find(".recent_comment_title:eq("+i+")");
                        let post_title=$this.find("a").html();
                        post_title=post_title?post_title.split("Re:")[1]:"";
                        let post_link=$this.find("a").attr("href");
                        let comment_body=$this.next().html();
                        let comment_user=$this.next().next().html()?$this.next().next().html().replace("--",""):""
                        if(i<5){
                            recentcommentsArry.push({post_title,post_link,comment_body,comment_user})
                        }
                    }
                    $this.setState({
                        recentcomment:recentcommentsArry,
                    })
                    
                    
                }
                /***相册  sidebar_imagecategory*/
                if($str.find("#sidebar_imagecategory").length>0){
                    let imagecategoryArray=[];
                    let $imagecategory=$str.find("#sidebar_imagecategory");
                    for(let i=0; i<$imagecategory.find("li").length;i++){
                        let  $_this=$imagecategory.find("li:eq("+i+")");
                        let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                        let title=remLastbrackval(values);
                        let num=getLastbrackval($_this.html().replace(/<[^>]+>/g, "")); //获取最后括号的数字; 
                        let link=$_this.find("a").attr("href");
                        imagecategoryArray.push({title, link, num});
                        // listserialnum
                    }
                    $this.setState({
                        imagecategory:imagecategoryArray,
                    })
                }

                /***获取链接  post_links   */
                if($str.find("#sidebar_categories").length>0){
                    let links=[];
                    for(let j=0; j<$str.find("#sidebar_categories .sidebar-block").length;j++){
                        let  $_links=$str.find("#sidebar_categories .sidebar-block:eq("+j+")");
                        let link_id=$_links.attr("id");
                        let exstId=["sidebar_postcategory","sidebar_postarchive", "sidebar_articlecategory","sidebar_articlearchive","sidebar_imagecategory"]
                        if(!exstId.includes(link_id)){
                            let title=$_links.find(".catListTitle").html().replace(/(^\s*)|(\s*$)/g, "");
                            let post_links_list=[]
                            for(let i=0; i<$_links.find("li").length;i++){
                                let  $_this=$_links.find("li:eq("+i+")");
                                let  name=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                                let link=$_this.find("a").attr("href");
                                post_links_list.push({name, link});
                            }
                            links.push({title:title,list:post_links_list})
                        }
                    }
                    $this.setState({
                        links:links,
                    })
                }
                // catListLinks
            }, ctx + "/ajax/sidecolumn.aspx",{dataType:"text", types:"GET",})
            /*****************获取 阅读排行、 评论排行 ********************************/
            ajaxFa.call($this, {}, (data) => {
                const $str = $("<code></code>").append($(data.replace(/\<script.*?\>/g, "")));
                /**阅读排行 */
                
                if($str.find("#sidebar_topviewedposts").length>0 && $str.find("#sidebar_topviewedposts").html().replace(/(^\s*)|(\s*$)/g, "").length>0){
                    let topviewedpostsArray=[];
                    let $topviewedposts=$str.find("#sidebar_topviewedposts");
                    for(let i=0; i<$topviewedposts.find("li").length;i++){
                        let  $_this=$topviewedposts.find("li:eq("+i+")");
                        let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                        let titleValue=listserialnum(values).title || "";
                        let id=listserialnum(values).num || "";
                        let title=remLastbrackval(titleValue);
                        let num=getLastbrackval(titleValue); //获取最后括号的数字; 
                        let link=$_this.find("a").attr("href");
                        topviewedpostsArray.push({id, title, link, num})
                        // listserialnum
                    }
                    $this.setState({
                        topviewedpost:topviewedpostsArray,
                    })
                }
                /** 评论排行榜 **/
                if($str.find("#sidebar_topcommentedposts").length>0 && $str.find("#sidebar_topcommentedposts").html().replace(/(^\s*)|(\s*$)/g, "").length>0){
                    let topcommentedpostsArray=[];
                    let $topcommentedposts=$str.find("#sidebar_topcommentedposts");
                    for(let i=0; i<$topcommentedposts.find("li").length;i++){
                        let  $_this=$topcommentedposts.find("li:eq("+i+")");
                        let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                        let titleValue=listserialnum(values).title || "";
                        let id=listserialnum(values).num || "";
                        let title=remLastbrackval(titleValue);
                        let num=getLastbrackval(titleValue); //获取最后括号的数字; 
                        let link=$_this.find("a").attr("href");
                        topcommentedpostsArray.push({id, title, link, num})
                        // listserialnum
                    }
                    $this.setState({
                        topcommentedpost:topcommentedpostsArray,
                    })
                }
                /******推荐排行榜 */
                if($str.find("#sidebar_topdiggedposts").length>0 && $str.find("#sidebar_topdiggedposts").html().replace(/(^\s*)|(\s*$)/g, "").length>0){
                    let topdiggedpostsArray=[];
                    let $topdiggedposts=$str.find("#sidebar_topdiggedposts");
                    for(let i=0; i<$topdiggedposts.find("li").length;i++){
                        let  $_this=$topdiggedposts.find("li:eq("+i+")");
                        let  values=$_this.find("a").html().replace(/(^\s*)|(\s*$)/g, "");
                        let titleValue=listserialnum(values).title || "";
                        let id=listserialnum(values).num || "";
                        let title=remLastbrackval(titleValue);
                        let num=getLastbrackval(titleValue); //获取最后括号的数字; 
                        let link=$_this.find("a").attr("href");
                        topdiggedpostsArray.push({id, title, link, num})
                        // listserialnum
                    }
                    $this.setState({
                        topdiggedpost:topdiggedpostsArray,
                    })
                }
                

            }, ctx + "/ajax/TopLists.aspx",{dataType:"text", types:"GET",})

            
        }
        componentDidMount(){
            // 日历
            if($("#sideBarMain").find("#blog-calendar").length>0){
                this.setState({
                    calendarHtml:$("#sideBarMain").find("#blog-calendar").html(),
                },()=>{
                    $("#sideBarMain").find("#blog-calendar").remove();
                }) 
            }
        }
        followMouseover=()=>{
            const {followState}=this.state;
            if(followState==="true"){
                this.setState({followText:"取消关注"})
            }
        }
        followMouseout=()=>{
            const {followText}=this.state;
            if(followText==="取消关注"){
                this.setState({followText:"已关注"})
            }

        }
        tofollow=()=>{
            let $this=this;
            const {followState}=this.state;
            tofollows(blogInfo, followState).then(function(s){
                let follows=s==="关注成功"?"true":s==="取消关注成功"?"false":"";
                $this.setState({followState:follows},()=>{
                    getBlogInfo().then((res) => {
                        $(".followers_num").html(res.followers)
                    })
                })
            })
        }
        archiveClick=(event)=>{
            var e=window.event||event; //消除浏览器差异 
            let $this=event.currentTarget;
            let html=($this.innerHTML).replace(/(^\s*)|(\s*$)/g, "");
            let dataStates=$this.dataset.states;
            if(dataStates==="down"){
                $this.dataset.states = "up";
                $this.innerHTML="收起"
                let $ul=getNearEle(e.target.parentNode, 1);
                $ul.style.height="auto"
                

            }else if(dataStates==="up"){
                $this.dataset.states = "down";
                $this.innerHTML="显示更多"
                let $ul=getNearEle(e.target.parentNode, 1);
                $ul.style.height=isMobile?"200px":"195px"
            }
            // event.currentTarget  //获取设置元素
        }
        render(){
            const {followers_num, followState, followText, category, calendarHtml, zzkHtml, catListLinks, toptags, newestPost, scorerank, archives, topviewedpost, topcommentedpost, topdiggedpost, recentcomment, imagecategory, links}=this.state;
            // 日历
            const {whichpage}=blogInfo;
            const {webpages}=whichpage;
            const archivesheight=isMobile?"200px":"195px"; //档案收缩高度
            
            return (
                <Fragment>
                   
                    <div className="blog_aboutUs sidebar-block">
                        <div className="news_avatar">
                            <figure><a href={"https://home.cnblogs.com/u/"+blogInfo.blogApp}><img src={blogInfo.blogAvatar} /></a></figure>
                            <span>
                                <p className="names"><a  href={"https://home.cnblogs.com/u/"+blogInfo.blogApp}>{blogInfo.admin_name}</a></p>
                                <p className="subTitle">{blogInfo.blogSubTitle}</p>
                            </span>
                        </div>
                        <div class="news_list">
                            <p><label><Icons type="icon-shijian1" size="13px" right="6px"/>入园日期:</label><span>{blogInfo.joinData}</span></p>
                            <p><label><Icons type="icon-nianling1"  size="13px" right="6px"/>园龄:</label><span>{blogInfo.joinTime}</span></p>
                        </div>
                        <div class="news_statistic">
                            {blogInfo.post_count &&
                                <div>
                                    <p class="statistic_num"><a href={ctx+"/p"}>{blogInfo.post_count}</a></p>
                                    <p class="statistic_name">随笔</p>
                                </div>
                            }
                            <div>
                                <p class="statistic_num followers_num">{followers_num}</p>
                                <p class="statistic_name">粉丝</p>
                            </div>
                            <div>
                                <p class="statistic_num">{blogInfo.followees}</p>
                                <p class="statistic_name">关注</p>
                            </div>
                        </div>
                        <div class="btn-user">
                            <div class="followsates" onMouseOver={this.followMouseover} onMouseOut={this.followMouseout} onClick={this.tofollow}>
                                {followState==="true"?followText:followState==="false"?<Fragment><Icons type="icon-zj" size="12px" right="6px" className="addfollowicon"/>关注</Fragment>:followState===false?"加载中...":""}
                            </div>
                            <div class="sendMessage"><a href={"https://msg.cnblogs.com/send/"+blogInfo.blogApp}>联系他</a></div>
                        </div>
                    </div>
                    {/* 活动 */}
                    {
                        activity.map((obj,i)=>{
                            if(obj.isShow && obj.icon){
                                return (
                                    <div class="blog-activity sidebar-block" key={i}>
                                        <div class="activity-main">
                                            {
                                                obj.link!=""?
                                                    <a href={obj.link} target="_bink"><img src={obj.icon}/></a>
                                                :
                                                    <img src={obj.icon}/>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {/* 找找看 */}
                    {
                        zzkHtml.length>0 &&
                        <div className="blog-zzks sidebar-block" >
                            <h3>搜索</h3>
                            <div className="zzks-content" dangerouslySetInnerHTML={{__html:zzkHtml}}>

                            </div>
                        </div>
                    }
                    {/* 日历 */}
                    {
                        calendarHtml.length>0 &&
                        
                            <div className="blog-calendars sidebar-block" dangerouslySetInnerHTML={{__html:calendarHtml}}>

                            </div>
                    }
                    {/* 分类 */}
                    {
                        category.length>0 &&
                            <div className="postCategorys sidebar-block">
                                 {
                                     category.length===1?
                                        <Fragment>
                                            <h3>{category[0].title}</h3>
                                            <ul>
                                                {
                                                    (category[0].list).map((obj,i)=>{
                                                        return (
                                                            <li key={i}><a href={obj.link} rel target="_bink">{obj.name}</a></li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            
                                        </Fragment>
                                    :
                                        category.length===2?
                                            <Tabs defaultActiveKey="1" onChange={()=>{}}>
                                                {
                                                    category.map((objs,j)=>{
                                                        return (
                                                            <TabPane tab={objs.title} key={j+1}>
                                                                <ul>
                                                                    {
                                                                        (objs.list).map((obj,i)=>{
                                                                            return (
                                                                                <li key={i}><a href={obj.link} rel target="_bink">{obj.name}</a></li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </TabPane>
                                                        )

                                                    })
                                                }

                                            </Tabs>
                                        :""
                                }

                            </div>
                    }
                    {/* 常用链接 */}
                    {
                        catListLinks.length>0 &&
                        <div className="blog-catListLink  sidebar-block">
                            <h3>常用链接</h3>
                            <ul>
                                {
                                    catListLinks.map((obj, i)=>{
                                        return (
                                            <li key={i}><a href={obj.link} title={obj.title} rel target="_bink">{obj.name}</a></li>
                                        )
                                        
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {/* 标签云 */}
                    {
                        toptags.length>0 &&
                            <div className="blog-toptags  sidebar-block">
                                <h3 className="catListTitle">标签云 <a href={ctx+"/tag"} class="toptags_more">更多</a></h3>
                                <ul>
                                    {
                                        toptags.map((obj, i)=>{
                                            return (
                                                <li key={i} style={{background:obj.bgColor}}><a href={obj.link}  rel target="_bink" title={obj.name+"("+obj.num+")"}>{obj.name}</a></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                    }
                    {/* 最新随笔 */}
                    {
                        newestPost.length>0 && webpages!=="index"?
                        <div className="blog-newestPost  sidebar-block">
                            <h3 className="catListTitle">最新随笔 </h3>
                            <ul>
                                {
                                    newestPost.map((obj, i)=>{
                                        return (
                                            <li key={i} >
                                                <a href={obj.link}  rel target="_bink" title={obj.title}>
                                                    {/* <em style={{background:i===0?"#ff3300":i===1?"#ff6600":i===2?"#ff9900":"#afb2b7"}}>{obj.num}</em> */}
                                                    {obj.title}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>:""
                    }
                    {/* 博客统计 */}
                    {
                        scorerank.liScore && scorerank.liRank &&
                        <div className="blog-scorerank  sidebar-block">
                            <h3 className="catListTitle">博客统计 </h3>
                            <ul>
                               { blogInfo.post_count && <li><label>随笔数：</label><span>{blogInfo.post_count}</span></li>}
                               { blogInfo.article_count&&<li><label>文章数：</label><span>{blogInfo.article_count}</span></li>}
                               { blogInfo.comment_count&&<li><label>评论数：</label><span>{blogInfo.comment_count}</span></li>}
                               { blogInfo.joinData&&<li><label>入园日期：</label><span>{blogInfo.joinData}</span></li>}
                               { blogInfo.joinTime&&<li><label>园龄：</label><span>{blogInfo.joinTime}</span></li>}
                               { blogInfo.followers&&<li><label>粉丝数：</label><span>{blogInfo.followers}</span></li>}
                               { blogInfo.followees&&<li><label>关注数：</label><span>{blogInfo.followees}</span></li>}
                                <li><label>积分：</label><span>{scorerank.liScore}</span></li>
                                <li><label>排名：</label><span>{scorerank.liRank}</span></li>
                            </ul>
                        </div>
                    }
                    {/* 档案       archives */}
                    {
                        archives.length>0 &&
                        <div className="blog-archives  sidebar-block">
                            {
                                archives.length===1?
                                    <Fragment>  {/**随笔档案 postarchive,  文章档案  articlearchive*/}
                                        <h3>{archives[0].title}</h3>
                                        <ul  style={{height:(archives[0]).list.length>12?archivesheight:"auto"}}>
                                            {
                                                (archives[0].list).map((obj,i)=>{
                                                    return (
                                                        <li key={i}><a href={obj.link} rel target="_bink" title={obj.name+"("+obj.num+")"}>{obj.name}</a></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        {(archives[0].list).length>12 &&
                                            <p className="archive-more Unfold"  >
                                                <span onClick={(e)=>this.archiveClick(e)}  data-states="down">显示更多</span>
                                            </p>
                                        }
                                    </Fragment>
                                :
                                archives.length===2?
                                    <Tabs defaultActiveKey="1" onChange={()=>{}}>
                                        {
                                            archives.map((objs,j)=>{
                                                return (
                                                    <TabPane tab={objs.title} key={j+1}>
                                                        <ul  style={{height:(objs.list).length>12?archivesheight:"auto"}}>
                                                            {
                                                                (objs.list).map((obj,i)=>{
                                                                    return (
                                                                        <li key={i}><a href={obj.link} rel target="_bink" title={obj.name+"("+obj.num+")"}>{obj.name}</a></li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                        {(objs.list).length>12 &&
                                                            <p className="archive-more Unfold">
                                                                <span onClick={(e)=>this.archiveClick(e)}  data-states="down">显示更多</span>
                                                            </p>
                                                        }
                                                    </TabPane>
                                                )

                                            })
                                        }
                                    </Tabs>
                                    :""
                            }

                        </div>
                    }
                    {/* 阅读排行榜  topviewedpost */}
                    {
                        topviewedpost.length>0 && 
                        <div className="blog-topviewedpost ranking  sidebar-block">
                            <h3 className="catListTitle">阅读排行榜</h3>
                            <ul>
                                {
                                    topviewedpost.map((obj, i)=>{
                                        return (
                                            <li key={i} >
                                                <a href={obj.link}  rel target="_bink" title={obj.title+"("+obj.num+")"}>
                                                    <em style={{background:i===0?"#ff3300":i===1?"#ff6600":i===2?"#ff9900":"#afb2b7"}}>{obj.id}</em>
                                                    {obj.title}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {/* 最新评论 recentcomment */}
                    {
                        recentcomment.length>0 && 
                        <div className="blog-recentcomment  sidebar-block">
                            <h3 className="catListTitle">最新评论<a href={ctx+"/RecentComments.html"} class="toptags_more">更多</a></h3>
                            <ul>
                                {
                                    recentcomment.map((obj, i)=>{
                                        return (
                                            <li>
                                                <div class="sidecomments_user">
                                                    <span class="sidecomments_avatar"><img src={userdefaultAvatars} /></span>
                                                    <span>{obj.comment_user}</span>
                                                </div>
                                                <div class="sidecomments_body" dangerouslySetInnerHTML={{__html: obj.comment_body}}></div>
                                                <div class="sidecomments_post">来自:<a href={obj.post_link}>{obj.post_title}</a></div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {/* 相册  imagecategory */}
                    {
                        imagecategory.length>0 && 
                        <div className="blog-imagecategory sidebar-block twoCol">
                            <h3 className="catListTitle">相册 </h3>
                            <ul>
                                {
                                    imagecategory.map((obj, i)=>{
                                        return (
                                            <li key={i} >
                                                <a href={obj.link}  rel target="_bink" title={obj.title+"("+obj.num+")"}>
                                                    {obj.title}({obj.num})
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {/* 评论排行榜  topviewedpost */}
                    {
                        topcommentedpost.length>0 && 
                        <div className="blog-topviewedpost ranking  sidebar-block">
                            <h3 className="catListTitle">评论排行榜</h3>
                            <ul>
                                {
                                    topcommentedpost.map((obj, i)=>{
                                        return (
                                            <li key={i} >
                                                <a href={obj.link}  rel target="_bink" title={obj.title+"("+obj.num+")"}>
                                                    <em style={{background:i===0?"#ff3300":i===1?"#ff6600":i===2?"#ff9900":"#afb2b7"}}>{obj.id}</em>
                                                    {obj.title}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {/* 推荐排行榜  topdiggedpost */}
                    {
                        topdiggedpost.length>0 && 
                        <div className="blog-topdiggedpost ranking  sidebar-block">
                            <h3 className="catListTitle">推荐排行榜</h3>
                            <ul>
                                {
                                    topdiggedpost.map((obj, i)=>{
                                        return (
                                            <li key={i} >
                                                <a href={obj.link}  rel target="_bink" title={obj.title+"("+obj.num+")"}>
                                                    <em style={{background:i===0?"#ff3300":i===1?"#ff6600":i===2?"#ff9900":"#afb2b7"}}>{obj.id}</em>
                                                    {obj.title}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {/* 链接 */}
                    {
                        links.map((obj,j)=>{
                            return (
                                <Fragment>
                                    {
                                        obj.title && (obj.list).length>0 &&
                                        <div className="blog-topdiggedpost ranking  sidebar-block" key={j}>
                                            <h3 className="catListTitle">{obj.title}</h3>
                                            <ul>
                                                {
                                                    (obj.list).map((obj, i)=>{
                                                        return (
                                                            <li key={i}><a href={obj.link} title={obj.name} rel target="_bink">{obj.name}</a></li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    }
                                </Fragment>
                            )
                        })
                    }
                </Fragment>
            )
        }
    }
    render(<SideBar />, document.getElementById("sideBar-mains"));
}


export {
    sideBar
}


