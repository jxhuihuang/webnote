function login(n) {
    return account.login(n)
}
function logout() {
    return account.logout()
}
function register() {
    return account.register()
}
function deliverT2() {
    $.getJSON("https://a1.cnblogs.com/group/T2", function (n) {
        n && $("#ad_t2").html(n.T2)
    })
}
function deliverC1C2() {
    $.getJSON("https://a1.cnblogs.com/group/C1-C2", function (n) {
        n ? n.C1 ? ($("#cnblogs_c1").html(n.C1),
            n.C2 ? $("#cnblogs_c2").html(n.C2) : $("#cnblogs_c2").hide()) : $.getScript("https://securepubads.g.doubleclick.net/tag/js/gpt.js", function () {
                deliverGoogleAdC1C2()
            }) : $.getScript("https://securepubads.g.doubleclick.net/tag/js/gpt.js", function () {
                deliverGoogleAdC1C2()
            })
    })
}
function deliverGoogleAdC1C2() {
    var n = screen.width < 500;
    window.googletag = window.googletag || {
        cmd: []
    };
    googletag.cmd.push(function () {
        googletag.defineSlot("/1090369/C1", [300, 250], "div-gpt-ad-1592365906576-0").addService(googletag.pubads());
        n || googletag.defineSlot("/1090369/C2", [468, 60], "div-gpt-ad-1592366332455-0").addService(googletag.pubads());
        googletag.defineSlot("/1090369/C3", [300, 250], "div-gpt-ad-1598349888178-0").addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices()
    });
    canShowAdsense() ? googletag.cmd.push(function () {
        googletag.display("div-gpt-ad-1592365906576-0")
    }) : $("#cnblogs_c1").hide();
    n || (canShowAdsense() ? googletag.cmd.push(function () {
        googletag.display("div-gpt-ad-1592366332455-0")
    }) : $("#cnblogs_c2").hide());
    loadSideColumnAd()
}
function hideWhenNoAdDelivery(n) {
    setTimeout(function () {
        var t = document.getElementById("google_ads_iframe_/1090369/" + n + "_0__container__");
        t && t.innerHTML === "" && $("#cnblogs_c2").hide()
    }, 400)
}
function deliverAdC1() { }
function deliverAdC2() {
    mobileVisit ? deliverC2Mobile() : deliverC2PC()
}
function deliverC2Mobile() { }
function hideC2Mobile() { }
function deliverC2PC() { }
function deliverC2Adsense() { }
function canShowAdsense() {
    var t = $("#cb_post_title_url"), n, i, r;
    if (t.length) {
        var u = t.html()
            , f = ["破解", "序列号", "crack", "CRACK", "下载", "激活", "keygen", "逆向工程", "注册", "汉化版", "密钥"].filter(function (n) {
                return u.indexOf(n) > -1
            });
        if (f.length > 0)
            return !1
    }
    return (n = $("#cnblogs_post_body"),
        n.length && (i = n.text(),
            i.length < 300)) ? !1 : (r = [1489405, 1873020, 3658314, 3349843, 3120490, 2131583, 5601171, 7783178, 2117105, 4315037, 3343865, 5106828, 9943394, 1512482, 8615503, 8495009, 8481402, 3873909, 8414234, 1718087, 6021462, 3925643, 6435456, 9242918, 6666860],
                $.inArray(cb_entryId, r) !== -1) ? !1 : !0
}
function loadSideColumnAd() {
    $.ajax({
        url: getAjaxBaseUrl() + "sideColumnAd",
        dataType: "html",
        cache: !1,
        type: "get",
        headers: {
            "X-Alt-Referer": document.referrer
        },
        success: function (n) {
            n && n.length > 10 && $.getJSON("https://a1.cnblogs.com/group/C3", function (n) {
                n && n.C3 ? $("#sidebar_c3").html(n.C3).show() : $("#sidebar_c3").is(":visible") && $("#sidebar_c3").hide()
            })
        }
    })
}
function blogCommentManager() {
    var i = 0;
    this.getCurrentPage = function () {
        return i
    }
        ;
    this.PageSize = function () {
        return pageSize
    }
        ;
    var t = function (n) {
        setTimeout(function () {
            location.hash = "#";
            location.hash = n
        }, 100)
    }
        , u = function () {
            var n = window.location.hash, t, i;
            return n && /#(\d+)/g.test(n) ? (t = $('#blog-comments-placeholder a.layer[href="' + n + '"]'),
                $(t).length ? (i = $(t).offset(),
                    window.scrollTo(i.left, i.top),
                    !0) : !1) : !0
        }
        , n = function () {
            $("#comment_form_container").css("visibility", "visible")
        }
        , r = function () {
            if (!allowComments) {
                $("#comment_form_container").html("（评论功能已被禁用）");
                return
            }
            var n = {};
            n.postId = cb_entryId;
            $("#comment_form_container").html('<div style="color:green;margin:20px;font-weight:normal;">评论框努力加载中...<\/div>');
            $.ajax({
                url: getAjaxBaseUrl() + "CommentForm.aspx",
                data: n,
                dataType: "html",
                cache: !1,
                type: "get",
                success: function (n) {
                    if (n) {
                        var i = $("#comment_form_container");
                        i.html(n);
                        $("#tbCommentBody").bind("keydown", function (n) {
                            commentManager.ctlEnterPost(n)
                        });
                        $("#btn_comment_submit").bind("click", function () {
                            return commentManager.postComment(),
                                !1
                        });
                        $("#tbCommentBody").focus(function () {
                            $("#tbCommentBody").mention({
                                typeaheadOpts: {
                                    under: !0
                                }
                            })
                        });
                        location.hash == "#commentform" && t("#commentform")
                    }
                },
                error: function () {
                    $("#comment_form_container").html("<span style='color:red'>评论框加载失败，请与管理员联系(contact@cnblogs.com)。<\/span>")
                }
            })
        };
    this.postComment = function () {
        $("#btn_comment_submit").val() == "修改" && $("#comment_edit_id").html != "" ? commentManager.UpdateComment() : commentManager.PostNewComment()
    }
        ;
    this.ctlEnterPost = function (n) {
        return n.ctrlKey && n.keyCode === 13 ? (commentManager.postComment(),
            !1) : !0
    }
        ;
    this.PostNewComment = function () {
        var t = $.trim($("#tbCommentBody").val()), n, i;
        if (!t) {
            ShowCommentMsg("请输入评论内容！");
            return
        }
        if (t.length > 4e3) {
            ShowCommentMsg("评论内容过长，超过4000个字数限制！当前长度：" + t.length);
            return
        }
        if (cb_entryId <= 0) {
            ShowCommentMsg("postId不正确");
            return
        }
        ShowCommentMsg("评论提交中...");
        $("#btn_comment_submit").attr("disabled", "disabled");
        n = {};
        n.postId = cb_entryId;
        n.body = t;
        i = $("#span_parentcomment_id").text();
        n.parentCommentId = /(\d)/.test(i) ? parseInt(i, 10) : 0;
        $.ajax({
            url: getAjaxBaseUrl() + "PostComment/Add.aspx",
            data: JSON.stringify(n),
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            headers: {
                RequestVerificationToken: $("#antiforgery_token").val()
            },
            timeout: 3e4,
            success: function (n) {
                n ? (n.isSuccess ? (ShowCommentMsg("感谢您的回复:) 服务器端执行耗时" + n.duration + "毫秒"),
                    $("#tbCommentBody").val(""),
                    $("#btn_edit_comment").click(),
                    commentEditor.removeComment(),
                    $("#divCommentShow").html($("#divCommentShow").html() + n.message),
                    markdown_highlight("#divCommentShow"),
                    cb_mathjax_render("#divCommentShow"),
                    zoomManager.apply("#divCommentShow img"),
                    ResetCommentBox()) : n.message ? ShowCommentMsg(n.message) : ShowCommentMsg("抱歉，评论提交失败！麻烦反馈至 contact@cnblogs.com "),
                    $("#btn_comment_submit").removeAttr("disabled")) : (ShowCommentMsg(errorMsg),
                        $("#btn_comment_submit").removeAttr("disabled"))
            },
            error: function (n, t) {
                n.status === 500 ? ShowCommentMsg("抱歉，发生了错误！麻烦反馈至 contact@cnblogs.com ") : n.status === 429 ? ShowCommentMsg("抱歉，提交过于频繁，请稍后再试。") : n.status > 0 ? (ShowCommentMsg("抱歉，评论提交失败，请尝试刷新页面！"),
                    console.log("评论提交失败，错误码：" + n.status + " 错误信息：" + n.responseText)) : ShowCommentMsg("抱歉，评论提交失败！xhr.status: " + n.status + ", textStatus: " + t);
                $("#btn_comment_submit").removeAttr("disabled")
            }
        })
    }
        ;
    this.UpdateComment = function () {
        var n = {};
        n.commentId = parseInt($("#comment_edit_id").html());
        n.body = $("#tbCommentBody").val();
        $.ajax({
            url: getAjaxBaseUrl() + "PostComment/Update.aspx",
            data: JSON.stringify(n),
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            headers: {
                RequestVerificationToken: $("#antiforgery_token").val()
            },
            success: function (t) {
                if (t)
                    t.isSuccess ? (ShowCommentMsg("修改成功"),
                        $("#comment_body_" + n.commentId).html(t.message),
                        ResetCommentBox(),
                        commentEditor.removeComment()) : ShowCommentMsg(t.message);
                else
                    ShowCommentMsg("抱歉！评论修改失败！请与管理员联系(contact@cnblogs.com)。")
            },
            error: function (n, t) {
                n.status === 500 ? ShowCommentMsg("抱歉！评论修改失败！请联系管理员 contact@cnblogs.com。") : (ShowCommentMsg("抱歉！评论修改失败！请尝试刷新页面。"),
                    console.log("抱歉，评论提交失败！xhr.status: " + n.status + ", textStatus: " + t))
            }
        })
    }
        ;
    this.Subscribe = function () {
        if (confirm("确认订阅吗？订阅后有新评论时会邮件通知您")) {
            var n = cb_entryId
                , t = cb_blogId;
            $("#commentbox_opt_sub").html("提交中...").css("color", "red").removeAttr("onclick");
            $.ajax({
                url: getAjaxBaseUrl() + "Subscribe/SubscribeComment.aspx",
                data: '{"blogId":' + t + ',"postId":' + n + "}",
                type: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                headers: {
                    RequestVerificationToken: $("#antiforgery_token").val()
                },
                success: function (n) {
                    n ? $("#commentbox_opt_sub").html("订阅成功") : $("#commentbox_opt_sub").html("订阅失败")
                }
            })
        }
    }
        ;
    this.Unsubscribe = function () {
        var n = cb_entryId;
        $("#commentbox_opt_unsub").html("提交中...");
        $("#commentbox_opt_unsub").css("color", "red");
        $("#commentbox_opt_unsub").removeAttr("onclick");
        $.ajax({
            url: getAjaxBaseUrl() + "Subscribe/UnsubscribeComment.aspx",
            data: '{"postId":' + n + "}",
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            headers: {
                RequestVerificationToken: $("#antiforgery_token").val()
            },
            success: function (n) {
                n ? $("#commentbox_opt_unsub").html("取消订阅成功") : $("#commentbox_opt_unsub").html("取消订阅失败")
            }
        })
    }
        ;
    this.ResetCommentBox = function () {
        $("#btn_comment_submit").val("提交评论");
        $("#comment_edit_id").html("");
        $("#tbCommentBody").val("")
    }
        ;
    this.loadMailSubscribeOperation = function () {
        $("#commentbox_opt").append('<a href="">订阅回复<\/a>')
    }
        ;
    this.renderComments = function (u, f, e) {
        var o, s, h;
        i = u;
        o = !1;
        s = 0;
        typeof e != "undefined" && (s = e,
            o = !0);
        !o && u == 0 && location.hash && /^#\d+$/g.test(location.hash) && (o = !0,
            s = location.hash.substring(1));
        u > 0 && (location.hash = "#!comments");
        h = {
            postId: cb_entryId,
            pageIndex: u,
            anchorCommentId: s
        };
        $("#blog-comments-placeholder").html('<div style="color:green;margin:50px 0;font-weight:normal;">努力加载评论中...<\/div>');
        $("#comment_form_container").html("");
        $.ajax({
            url: getAjaxBaseUrl() + "GetCommentCount.aspx",
            data: {
                postId: h.postId
            },
            type: "get",
            dataType: "text",
            cache: !1,
            success: function (i) {
                i ? ($("#post_comment_count").html(i),
                    $.ajax({
                        url: getAjaxBaseUrl() + "GetComments.aspx",
                        data: h,
                        type: "get",
                        dataType: "text",
                        cache: !1,
                        success: function (i) {
                            $("#blog-comments-placeholder").html(i);
                            n();
                            o ? t("#" + s) : (location.hash == "#!comments" || location.hash == "#comments_pager_top") && t("#!comments");
                            comment_maxId = $("#comment-maxId").html();
                            comment_maxDate = $("#comment-maxDate").html();
                            cb_CodeHighlight();
                            markdown_highlight("#blog-comments-placeholder");
                            cb_mathjax_render("#blog-comments-placeholder");
                            zoomManager.apply(".blog_comment_body img")
                        },
                        error: function (t) {
                            t.status > 0 && $("#blog-comments-placeholder").html("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com");
                            n()
                        }
                    })) : (n(),
                        cb_CodeHighlight(),
                        $("#blog-comments-placeholder").html(""))
            },
            error: function (t) {
                t.status > 0 && $("#blog-comments-placeholder").html("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com");
                n()
            }
        });
        r()
    }
}
function RefreshCommentList() {
    return $("#tip_comment").html(""),
        $("#span_refresh_tips").show(),
        $("#span_refresh_tips").html("正在刷新..."),
        $("#span_refresh_tips").css("color", "red"),
        $("#lnk_RefreshComments").hide(),
        comment_maxDate || (comment_maxDate = $("#post-date").html()),
        loadNewComments(cb_entryId, comment_maxDate, comment_maxId),
        !1
}
function loadNewComments(n, t, i) {
    var r = {
        parentId: n,
        startDateStr: t,
        startId: +i
    };
    $.ajax({
        url: getAjaxBaseUrl() + "comment/NewComments.aspx",
        type: "POST",
        data: JSON.stringify(r),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        timeout: 1e4,
        success: function (n) {
            if (n) {
                var t = $("#divCommentShow div.comment_my_posted");
                $(t).length && $(t).remove();
                $("#divCommentShow").html(n);
                zoomManager.apply("#divCommentShow img")
            } else
                $("#tip_comment").html("暂无新评论");
            $("#span_refresh_tips").hide();
            $("#lnk_RefreshComments").show()
        },
        error: function (n) {
            $("#tip_comment").html("刷新评论失败，状态码：" + n.status + " 错误信息：" + n.responseText);
            $("#span_refresh_tips").hide();
            $("#lnk_RefreshComments").show()
        }
    })
}
function ReplyComment(n, t) {
    var i = $("#a_comment_author_" + n).text().trim();
    return $("#tbCommentBody").focus().val("@" + i + "\n" + $("#tbCommentBody").val()),
        $("#span_parentcomment_id").html(n),
        t.length > 0 && $("#span_comment_replyto").html(t),
        !1
}
function QuoteComment(n, t) {
    return $("#tip_comment").html("正在加载引用内容..."),
        $("#span_parentcomment_id").html(n),
        $("#span_comment_replyto").html(t),
        GetQuoteComment(n),
        !1
}
function GetQuoteComment(n) {
    var t = {
        commentId: n
    };
    return $.ajax({
        url: getAjaxBaseUrl() + "comment/GetCommentBody.aspx",
        type: "post",
        data: JSON.stringify(t),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        timeout: 1e4,
        success: function (t) {
            var f, r, u, i;
            if (t) {
                for (f = $("#a_comment_author_" + n).text(),
                    t.length > 300 && (t = t.substring(0, 300) + "..."),
                    r = t.split("\n"),
                    u = "@" + f + "\n",
                    i = 0; i < r.length; i++)
                    u += "> " + r[i].trim() + "\n";
                $("#comment_edit_id").html(n);
                $("#tbCommentBody").focus();
                $("#tbCommentBody").val(u + "-----\n")
            }
            ShowCommentMsg("")
        },
        error: function (n) {
            $("#btn_comment_submit").val("修改");
            ShowCommentMsg("获取引用内容失败，状态码：" + n.status + " 错误信息：" + n.responseText)
        }
    }),
        !1
}
function GetCommentBody(n) {
    ShowCommentMsg("评论内容加载中...");
    var t = {
        commentId: n
    };
    return $.ajax({
        url: getAjaxBaseUrl() + "comment/GetCommentBody.aspx",
        type: "post",
        data: JSON.stringify(t),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        timeout: 1e4,
        success: function (t) {
            t && ($("#comment_edit_id").html(n),
                $("#tbCommentBody").focus(),
                $("#tbCommentBody").val(t),
                $("#btn_comment_submit").val("修改"),
                $("#span_comment_canceledit").css("display", "inline"));
            ShowCommentMsg("")
        },
        error: function (n) {
            $("#btn_comment_submit").val("修改");
            ShowCommentMsg("获取评论内容失败，状态码：" + n.status + " 错误信息：" + n.responseText)
        }
    }),
        !1
}
function DelComment(n, t, i) {
    return confirm("确认要删除该评论吗?") && (currentDelElement = t,
        currentCommentID = n,
        $(currentDelElement).html("<span style='color:red'>正在删除...<\/span>"),
        $(currentDelElement).removeAttr("href"),
        $(currentDelElement).removeAttr("onclick"),
        $.ajax({
            url: getAjaxBaseUrl() + "comment/DeleteComment.aspx",
            type: "post",
            data: JSON.stringify({
                commentId: currentCommentID,
                pageIndex: commentManager.getCurrentPage(),
                parentId: +i
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            timeout: 1e4,
            headers: {
                RequestVerificationToken: $("#antiforgery_token").val()
            },
            success: function (n) {
                n ? ($("#comment_body_" + currentCommentID).html(""),
                    document.getElementById("comment_anchor_" + currentCommentID) != null && (document.getElementById("comment_anchor_" + currentCommentID).parentNode.innerHTML = ""),
                    currentDelElement.parentNode != null && (currentDelElement.parentNode.innerHTML = "<span style='color:red'>删除成功!<\/span>")) : $(currentDelElement).html("删除失败！")
            },
            error: function () {
                $(currentDelElement).html("删除失败！")
            }
        })),
        !1
}
function clt_enter(n) {
    return n.ctrlKey && n.keyCode === 13 ? (PostComment(),
        !1) : !0
}
function ShowCommentMsg(n) {
    $("#tip_comment").html(n);
    $("#tip_comment2").html(n)
}
function InsertCodeToEditor(n) {
    $("#tbCommentBody").focus();
    $("#tbCommentBody").val($("#tbCommentBody").val() + n)
}
function CancelCommentEdit() {
    confirm("确认取消修改吗？") && ResetCommentBox()
}
function ResetCommentBox() {
    $("#btn_comment_submit").val("提交");
    $("#comment_edit_id").html("");
    $("#span_comment_canceledit").css("display", "none");
    $("#tbCommentBody").val("").show();
    $("#tbCommentBodyPreview").hide()
}
function RefreshPage() {
    return location.reload(),
        !1
}
function AddParamToUrl(n, t, i) {
    var r = n.indexOf("?");
    return r > 0 && (n = n.substring(0, r)),
        n + "?" + t + "=" + i
}
function OpenImageUploadWindow() {
    var n = location.protocol + "//upload.cnblogs" + location.hostname.substring(location.hostname.lastIndexOf(".")) + "/imageuploader/upload?host=www.cnblogs.com&editor=0#tbCommentBody";
    document.domain = "cnblogs." + location.hostname.substring(location.hostname.lastIndexOf(".") + 1, location.hostname.length);
    OpenWindow(n, 450, 120, 200)
}
function insertIndent(n) {
    var t = $("#" + n).selection();
    t == "" ? $("#" + n).parseHtml("　　") : $("#" + n).parseHtml("　　" + t)
}
function insertUbbUrl(n) {
    var i = prompt("显示链接的文本.\n如果为空，那么将只显示超级链接地址", ""), t;
    i != null && (t = prompt("http:// 超级链接", "http://"),
        t != "" && t != "http://" && (i != "" ? $("#" + n).parseHtml("[url=" + t + "]" + i + "[/url]") : $("#" + n).parseHtml("[url]" + t + "[/url]")))
}
function insertUbbImg(n) {
    var t = prompt("请先将图片上传到您的图库中，然后将图片地址拷下粘贴在此：", "http://");
    t != null && $.trim(t) != "" && t.toLowerCase() != "http://" && $("#" + n).parseHtml("[img]" + t + "[/img]")
}
function insertUploadImg(n) {
    $("#tbCommentBody").parseHtml("[img]" + n + "[/img]\n");
    $("#tbCommentBody").focus()
}
function insertUbbCode() {
    var n = 450, t = 400, r = (screen.width - n) / 2, u = (screen.height - t) / 2, i;
    document.domain = "cnblogs." + location.hostname.substring(location.hostname.lastIndexOf(".") + 1, location.hostname.length);
    i = window.open("/SyntaxHighlighter.htm", "_blank", "width=" + n + ",height=" + t + ",toolbars=0,resizable=1,left=" + r + ",top=" + u);
    i.focus()
}
function green_channel_success(n, t) {
    $(n).replaceWith('<span style="color:red">' + t + "<\/span>")
}
function shareOnWechat() {
    var n = document.location.href;
    n = n.replace("//www.cnblogs.com/", "//w.cnblogs.com/");
    var t = 420
        , i = 330
        , r = (window.screen.availHeight - 30 - i) / 2
        , u = (window.screen.availWidth - 10 - t) / 2;
    window.open("//common.cnblogs.com/qrcode.html?url=" + encodeURIComponent(n), "_blank", "location=no,top=" + r + ",left=" + u + ", toolbar=no, directories=no, titlebar=no, status=no, menubar=no, scrollbars=no,status=no, resizable=no, copyhistory=no, width=" + t + ", height=" + i + "")
}
function tsina_a() {
    var n = screen
        , t = document
        , i = encodeURIComponent
        , r = "http://v.t.sina.com.cn/share/share.php?"
        , u = t.location.href
        , f = ["url=", i(u), "&title=", i(t.title)].join("");
    window.open([r, f].join(""), "mb", ["toolbar=0,status=0,resizable=1,width=620,height=450,left=", (n.width - 620) / 2, ",top=", (n.height - 450) / 2].join("")) || (u.href = [r, f].join(""))
}
function ShareToTsina() {
    /Firefox/.test(navigator.userAgent) ? setTimeout(tsina_a, 0) : tsina_a()
}
function loadNewsAndKb() {
    var t = $("#under_post_card1"), n;
    $(t).is(":visible") && $(t).html('<div class="under-post-card"><b>AWS免费产品<\/b>：<br/>· <a onclick=\'ga("send", "event", "Link", "click", "aws-underpost-card")\' href="https://aws.amazon.com/cn/free/webapps/?trk=ba_a134p000006vc6OAAQ&amp;trkCampaign=webapps&amp;sc_channel=ba&amp;sc_campaign=cnblogs&amp;sc_outcome=Acquisition&amp;sc_geo=CHNA&amp;sc_country=CN&amp;sc_publisher=Others" target="_blank">如何在AWS上免费构建网站<\/a><br/>· <a onclick=\'ga("send", "event", "Link", "click", "aws-underpost-card")\' href="https://aws.amazon.com/cn/free/storage/?trk=ba_a134p000006vc7JAAQ&amp;trkCampaign=storage&amp;sc_channel=ba&amp;sc_campaign=cnblogs&amp;sc_outcome=Acquisition&amp;sc_geo=CHNA&amp;sc_country=CN&amp;sc_publisher=Others" target="_blank">AWS免费云存储解决方案<\/a><br/>· <a onclick=\'ga("send", "event", "Link", "click", "aws-underpost-card")\' href="https://aws.amazon.com/cn/free/database/?trk=ba_a134p000006vc7YAAQ&amp;trkCampaign=database&amp;sc_channel=ba&amp;sc_campaign=cnblogs&amp;sc_outcome=Acquisition&amp;sc_geo=CHNA&amp;sc_country=CN&amp;sc_publisher=Others" target="_blank">在AWS上免费构建数据库<\/a><br/>· <a onclick=\'ga("send", "event", "Link", "click", "aws-underpost-card")\' href="https://aws.amazon.com/cn/free/machine-learning/?trk=ba_a134p000006vc7nAAA&amp;trkCampaign=ML&amp;sc_channel=ba&amp;sc_campaign=cnblogs&amp;sc_outcome=Acquisition&amp;sc_geo=CHNA&amp;sc_country=CN&amp;sc_publisher=Others" target="_blank">AWS上的免费机器学习<\/a>');
    n = $("#under_post_card2");
    $(n).is(":visible") && $.ajax({
        url: getAjaxBaseUrl() + "UnderPostNews.aspx",
        type: "get",
        dataType: "text",
        success: function (t) {
            $(n).html(t.replace("<b>最新 IT 新闻<\/b>:", "<b>最新新闻<\/b>："))
        }
    })
}
function loadAdUnderPost() { }
function loadBlogSignature() {
    $.ajax({
        url: getAjaxBaseUrl() + "signature.aspx",
        data: {
            blogId: cb_blogId
        },
        type: "get",
        dataType: "text",
        success: function (n) {
            n && $("#MySignature").html(n).show()
        }
    })
}
function loadPageBeginHtml() {
    currentBlogApp && $.ajax({
        url: getAjaxBaseUrl() + "PageBeginHtml.aspx",
        type: "get",
        dataType: "text",
        success: function (n) {
            n && (n.indexOf("<script") > -1 ? $.getScript(location.protocol + "//common.cnblogs.com/script/jquery.writeCapture-min.js", function () {
                $("#page_begin_html").writeCapture().html(n)
            }) : $("#page_begin_html").html(n))
        }
    })
}
function loadPageEndHtml() {
    currentBlogApp && $.ajax({
        url: getAjaxBaseUrl() + "PageEndHtml.aspx",
        type: "get",
        dataType: "text",
        success: function (n) {
            n && (n.indexOf("<script") > -1 ? $.getScript(location.protocol + "//common.cnblogs.com/script/jquery.writeCapture-min.js", function () {
                $("#page_end_html").writeCapture().html(n)
            }) : $("#page_end_html").html(n))
        }
    })
}
function loadBlogNews() {
    $.ajax({
        url: getAjaxBaseUrl() + "news.aspx",
        type: "get",
        dataType: "text",
        success: function (n) {
            if (n)
                if (n.indexOf("<script") < n.indexOf("<script>getFollowStatus")) {
                    if (n.indexOf("cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory") >= 0) {
                        var t = n.match(/GhUserName *: *['"](\w+)['"]/);
                        (t === null || t[1].toUpperCase() === "BNDong".toUpperCase()) && (n = n.replace(/(GhVersions *: *["'])v1\.([0-1]\.\d+|2\.[0-5].*?),*/g, "$1v1.2.6").replace(/(Cnblogs-Theme-SimpleMemory@)v1\.([0-1]\.\d+|2\.[0-5])/gi, "$1v1.2.6"))
                    }
                    $.getScript(location.protocol + "//common.cnblogs.com/script/jquery.writeCapture-min.js", function () {
                        $("#sidebar_news").writeCapture().html(n).show()
                    })
                } else
                    n.indexOf("错误提示：发生了异常") < 0 && $("#sidebar_news").html(n).show()
        }
    })
}
function loadBlogCalendar(n) {
    $.ajax({
        url: getAjaxBaseUrl() + "calendar.aspx",
        data: {
            dateStr: n
        },
        type: "get",
        dataType: "text",
        success: function (n) {
            n.trim() && ($("#blog-calendar").html(n),
                $("#blog-calendar").show())
        }
    })
}
function loadBlogDefaultCalendar() {
    if ($("#blog-calendar").length) {
        var t = "", i = $("#cb_post_title_url").attr("href"), n;
        (n = /\/archive\/(\d{4}\/\d{2}\/\d{2})\//g.exec(i)) ? t = n[1] : (n = /\/archive\/(\d{4}\/\d{2}\/\d{2})\./g.exec(i)) ? t = n[1] : (n = /\/archive\/(\d{4}\/\d{2})./g.exec(i)) && (t = n[1]);
        loadBlogCalendar(t)
    }
}
function loadBlogSideColumn() {
    $("#blog-sidecolumn").length && $.ajax({
        url: getAjaxBaseUrl() + "sidecolumn.aspx",
        type: "get",
        dataType: "text",
        success: function (n) {
            n && ($("#blog-sidecolumn").html(n),
                loadBlogTopLists())
        }
    })
}
function loadBlogTopLists() {
    $("#blog-sidecolumn").length && $.ajax({
        url: getAjaxBaseUrl() + "TopLists.aspx",
        type: "get",
        dataType: "text",
        success: function (n) {
            n && $("#blog-sidecolumn").append(n)
        }
    })
}
function LoadPostCategoriesTags(n, t) {
    $.ajax({
        url: getAjaxBaseUrl() + "CategoriesTags.aspx",
        type: "get",
        contentType: "application/json; charset=utf-8",
        data: {
            blogId: n,
            postId: t
        },
        cache: !1,
        dataType: "text",
        timeout: 1e4,
        success: function (n) {
            n && $("#blog_post_info_block").prepend(n)
        }
    })
}
function LoadPostInfoBlock(n, t, i, r) {
    $.ajax({
        url: getAjaxBaseUrl() + "BlogPostInfo.aspx",
        type: "get",
        contentType: "application/json; charset=utf-8",
        data: {
            blogId: n,
            postId: t,
            blogUserGuid: r
        },
        cache: !1,
        dataType: "text",
        timeout: 1e4,
        success: function (n) {
            n && $("#blog_post_info").html(n)
        },
        error: function () { }
    })
}
function GetPrevNextPost(n) {
    $.get(getAjaxBaseUrl() + "post/prevnext", {
        postId: n
    }, function (n) {
        n && $("#post_next_prev").html(n)
    }, "html")
}
function loadBlogStats() {
    $.ajax({
        url: getAjaxBaseUrl() + "blogStats",
        type: "get",
        dataType: "text",
        timeout: 1e3,
        success: function (n) {
            n && $("#blog_stats_place_holder").replaceWith(n)
        }
    })
}
function GetHistoryToday(n, t, i) {
    $.ajax({
        url: getAjaxBaseUrl() + "HistoryToday.aspx",
        data: {
            blogId: n,
            dateCreated: i
        },
        type: "get",
        dataType: "text",
        timeout: 1e4,
        success: function (n) {
            n && $("#HistoryToday").html(n)
        }
    })
}
function getBlogPostBody(n) {
    $.ajax({
        url: getAjaxBaseUrl() + "postbody/fulltext.aspx",
        data: JSON.stringify({
            postId: n
        }),
        type: "post",
        contentType: "application/json",
        dataType: "text",
        success: function (t) {
            if (t) {
                var i = "#postlist_postbody_" + n;
                $(i).html(t);
                cb_CodeHighlight();
                cb_mathjax_render(i);
                fixPostListBodyFormat();
                n > 3861237 && $.getScript(location.protocol + "//common.cnblogs.com/highlight/10.3.1/highlight.min.js", function () {
                    hljs.initHighlightingOnLoad()
                })
            } else
                $("#postlist_postbody_" + n).html("")
        }
    })
}
function loadOptUnderPost() {
    isLogined && $.ajax({
        url: getAjaxBaseUrl() + "OptUnderPost.aspx",
        type: "get",
        data: {
            postId: cb_entryId
        },
        dataType: "text",
        success: function (n) {
            n && ($("#opt_under_post").html(n),
                loadSiteHomeAuditStatus())
        }
    })
}
function loadSiteHomeAuditStatus() {
    $("#audit_sitehome_pass").hide();
    $.ajax({
        url: "https://audit.cnblogs.com/blogPosts-home",
        type: "get",
        xhrFields: {
            withCredentials: !0
        },
        success: function (n) {
            n.HomeBlogPosts.some(function (n) {
                return n.Id === cb_entryId
            }) && $("#audit_sitehome_pass").show()
        }
    })
}
function passSiteHome() {
    var n = $("#audit_sitehome_pass");
    $(n).html("<span style='color:red'>首页通过中...<\/span>");
    $.ajax({
        url: "https://audit.cnblogs.com/blogPosts-home/pass/" + currentBlogId + "/" + cb_entryId,
        type: "post",
        xhrFields: {
            withCredentials: !0
        },
        success: function () {
            $(n).html("<span style='color:red'>首页通过成功<\/span>")
        },
        error: function () {
            $(n).html("<span style='color:red'>首页通过失败! <\/span>")
        }
    })
}
function outFromAggHome() {
    var n = $("#audit_sitehome_remove");
    $(n).html("<span style='color:red'>移出首页中...<\/span>");
    $.ajax({
        url: getAjaxBaseUrl() + "RemoveFromSiteHome",
        data: JSON.stringify({
            blogId: currentBlogId,
            postId: cb_entryId
        }),
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            RequestVerificationToken: $("#antiforgery_token").val()
        },
        success: function (t) {
            t.success ? $(n).html("<span style='color:red'>移出首页成功<\/span>") : $(n).html("<span style='color:red'>移出首页失败! " + t.message + "<\/span>")
        },
        error: function () {
            $(n).html("<span style='color:red'>移出首页失败<\/span>")
        }
    })
}
function auditPassBlogPost() {
    var n = $("#audit_blogpost_pass");
    $(n).html("<span style='color:red'>博文通过中...<\/span>");
    $.ajax({
        url: "https://audit.cnblogs.com/blogposts/pass/" + currentBlogId + "/" + cb_entryId,
        type: "post",
        dataType: "json",
        xhrFields: {
            withCredentials: !0
        },
        success: function (t) {
            t.Success || t.success ? $(n).html("<span style='color:red'>博文通过成功<\/span>") : $(n).html("<span style='color:red'>博文通过失败! " + t.message + "<\/span>")
        },
        error: function () {
            $(n).html("<span style='color:red'>博文通过失败<\/span>")
        }
    })
}
function showImages(n) {
    if (cb_entryId > 4123456) {
        var t = $("#" + n + " img");
        $(t).each(function () {
            var n, t;
            this.src.indexOf(".qpic.cn") > 0 && (n = $(this).attr("data-src"),
                typeof n != typeof undefined && n.length > 10 && (this.src = n));
            this.src.indexOf(".jianshu.io") > 0 && (t = $(this).attr("data-original-src"),
                typeof t != typeof undefined && t.length > 10 && (this.src = t))
        })
    }
}
function fixPostBody() {
    var n = $("#cnblogs_post_body .mermaid").length > 0;
    n ? cb_entryId > 92e5 && $.ajax({
        type: "GET",
        url: "https://common.cnblogs.com/scripts/mermaid/mermaid-8.8.2.min.js",
        dataType: "script",
        cache: !0
    }) : ($("div.cnblogs_code").each(function () {
        var t, n;
        if (!this.onclick && (t = $(this).children(".cnblogs_code_hide"),
            t.length)) {
            n = this;
            $(this).find(".code_img_closed").off().on("click", function () {
                showCodeBlock(n)
            });
            $(this).find(".code_img_opened").off().on("click", function () {
                showCodeBlock(n)
            });
            $(this).find(".cnblogs_code_collapse").off().on("click", function () {
                showCodeBlock(n)
            })
        }
    }),
        cb_entryId <= 5928739 && $("div.cnblogs_code img").each(function () {
            var n = "";
            this.id.indexOf("Code_Closed_Image") >= 0 && (n = this.id.substring(18),
                this.onclick = function () {
                    this.style.display = "none";
                    document.getElementById("Code_Closed_Text_" + n).style.display = "none";
                    document.getElementById("Code_Open_Image_" + n).style.display = "inline";
                    document.getElementById("Code_Open_Text_" + n).style.display = "inline"
                }
            );
            this.id.indexOf("Code_Open_Image") >= 0 && (n = this.id.substring(16),
                this.onclick = function () {
                    this.style.display = "none";
                    document.getElementById("Code_Open_Text_" + n).style.display = "none";
                    document.getElementById("Code_Closed_Image_" + n).style.display = "inline";
                    document.getElementById("Code_Closed_Text_" + n).style.display = "inline"
                }
            );
            this.id.indexOf("Codehighlighter") >= 0 && this.id.indexOf("_Open_Image") >= 0 && (n = this.id.substring(15, this.id.indexOf("_Open_Image")),
                this.onclick = function () {
                    this.style.display = "none";
                    document.getElementById("Codehighlighter" + n + "_Open_Text").style.display = "none";
                    document.getElementById("Codehighlighter" + n + "_Closed_Image").style.display = "inline";
                    document.getElementById("Codehighlighter" + n + "_Closed_Text").style.display = "inline"
                }
            );
            this.id.indexOf("Codehighlighter") >= 0 && this.id.indexOf("_Closed_Image") >= 0 && (n = this.id.substring(15, this.id.indexOf("_Closed_Image")),
                this.onclick = function () {
                    this.style.display = "none";
                    document.getElementById("Codehighlighter" + n + "_Closed_Text").style.display = "none";
                    document.getElementById("Codehighlighter" + n + "_Open_Image").style.display = "inline";
                    document.getElementById("Codehighlighter" + n + "_Open_Text").style.display = "inline"
                }
            )
        }));
    $("#cnblogs_post_body table").wrap("<div class='table-wrapper'><\/div>");
    showImages("cnblogs_post_body")
}
function fixPostListBodyFormat() { }
function markdown_highlight(n) {
    var t, i;
    if (n || (n = "#cnblogs_post_body"),
        t = n === "#cnblogs_post_body",
        t && $(".blogpost-body-html pre:has(code.prism)").length && typeof Prism == "undefined") {
        prismRender();
        return
    }
    i = t && $(".blogpost-body-html").length > 0;
    $(n + " pre code").each(function (n, t) {
        if (i) {
            var r = $(t).parent()
                , u = $(r).css("background-color");
            $(r).prop("tagName") == "PRE" && (u == "rgba(0, 0, 0, 0)" || u == "transparent") && $(r).addClass("codeblock")
        }
        hljs.highlightBlock(t)
    })
}
function prismRender() {
    window.Prism = window.Prism || {};
    Prism.manual = !0;
    $("head").append($('<link rel="stylesheet" type="text/css" />').attr("href", "https://common.cnblogs.com/prism/themes/prism-tomorrow-custom.css"));
    $.getScript("https://common.cnblogs.com/prism/prism.js?v=1.23.0", function () {
        Prism.highlightAllUnder(document.getElementById("cnblogs_post_body"))
    })
}
function cb_mathjax_render(n) {
    if (cb_enable_mathjax)
        if ($(".katex-mathml").length)
            $("head").append($('<link rel="stylesheet" type="text/css" />').attr("href", "https://common.cnblogs.com/katex/0.12.0/katex.min.css")),
                $.getScript("https://common.cnblogs.com/katex/0.12.0/katex.min.js", function () {
                    $.getScript("https://common.cnblogs.com/katex/0.12.0/auto-render.min.js", function () {
                        renderMathInElement(document.getElementById("cnblogs_post_body"))
                    })
                });
        else {
            var t = document.getElementById(n);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, t])
        }
}
function showCodeBlock(n) {
    var t = $(n).children(".cnblogs_code_hide").first();
    t.css("display") == "none" ? (t.parent().find("span.cnblogs_code_collapse").hide(),
        t.show(),
        $(n).find(".code_img_opened").show(),
        $(n).find(".code_img_closed").hide(),
        $(t).find("span.cnblogs_code_copy").length || showCopyCode(t)) : (t.parent().find("span.cnblogs_code_collapse").show(),
            t.hide(),
            $(n).find(".code_img_opened").hide(),
            $(n).find(".code_img_closed").show())
}
function cb_CodeHighlight() {
    var n = !1
        , t = $("pre");
    (t.length && $.each(t, function () {
        var t = $(this).attr("class");
        t && t.indexOf("brush:") >= 0 && (n = !0,
            $(this).html().indexOf("<span") >= 0 && $(this).text($(this).text()),
            t.indexOf("gutter:true;") >= 0 && $(this).parent().addClass("sh-gutter"))
    }),
        n) && (SyntaxHighlighter.autoloader.apply(null, shBushPathPrepare("applescript\t\t\t    @shBrushAppleScript.js", "actionscript3 as3\t\t@shBrushAS3.js", "bash shell\t\t\t\t@shBrushBash.js", "coldfusion cf\t\t\t@shBrushColdFusion.js", "cpp c\t\t\t\t\t@shBrushCpp.js", "c# c-sharp csharp\t\t@shBrushCSharp.js", "css\t\t\t\t\t    @shBrushCss.js", "delphi pascal pas\t\t@shBrushDelphi.js", "diff patch       \t\t@shBrushDiff.js", "erl erlang\t\t\t\t@shBrushErlang.js", "groovy\t\t\t\t\t@shBrushGroovy.js", "java\t\t\t\t\t    @shBrushJava.js", "jfx javafx\t\t\t\t@shBrushJavaFX.js", "js jscript javascript\t@shBrushJScript.js", "perl pl Perl\t\t\t\t@shBrushPerl.js", "php\t\t\t\t\t    @shBrushPhp.js", "text plain\t\t\t\t@shBrushPlain.js", "py python\t\t\t\t@shBrushPython.js", "ruby rails ror rb\t\t@shBrushRuby.js", "sass scss\t\t\t\t@shBrushSass.js", "scala\t\t\t\t\t@shBrushScala.js", "sql\t\t\t\t\t    @shBrushSql.js", "vb vbnet\t\t\t\t    @shBrushVb.js", "xml xhtml xslt html\t    @shBrushXml.js?id=20150508", "objc obj-c               @shBrushObjectiveC.js", "f# f-sharp fsharp        @shBrushFSharp.js", "xpp dynamics-xpp         @shBrushDynamics.js", "r s splus                @shBrushR.js", "matlab                   @shBrushMatlab.js", "swift                    @shBrushSwift.js", "go golang                @shBrushGo.js", "mathematica              @shBrushMathematica.js")),
            SyntaxHighlighter.config.strings.expandSource = "+ View Code",
            SyntaxHighlighter.vars.discoveredBrushes = null,
            SyntaxHighlighter.defaults["auto-links"] = !1,
            SyntaxHighlighter.defaults["quick-code"] = !1,
            SyntaxHighlighter.all())
}
function cnblogs_code_collapse(n) {
    n.children("div.cnblogs_code_open").css("display") != "none" ? (n.children("div.cnblogs_code_open").css("display", "none"),
        n.children("img.code_img_opened").css("display", "none"),
        n.children("img.code_img_closed").css("display", "inline")) : (n.children("div.cnblogs_code_open").css("display", "block"),
            n.children("img.code_img_opened").css("display", "inline"),
            n.children("img.code_img_closed").css("display", "none"))
}
function cnblogs_code_show(n) {
    var t = $("#cnblogs_code_open_" + n);
    t.css("display") == "none" && (t.parent().find("span.cnblogs_code_collapse").hide(),
        t.show(),
        $("#code_img_opened_" + n).show(),
        $("#code_img_closed_" + n).hide(),
        $(t).find("span.cnblogs_code_copy").length || showCopyCode(t))
}
function cnblogs_code_hide(n, t) {
    if ($("#cnblogs_code_open_" + n).css("display") != "none") {
        var i = $("#cnblogs_code_open_" + n);
        i.hide();
        $("#code_img_opened_" + n).hide();
        $("#code_img_closed_" + n).show();
        i.parent().find("span.cnblogs_code_collapse").show();
        t.stopPropagation ? t.stopPropagation() : window.event && (window.event.cancelBubble = !0)
    }
}
function code_collapse_toggle(n) {
    $(n).toggle();
    var t = n.id;
    IsCodeCollapseNode(t, "_Open_Image") ? ($("#" + t.replace("_Open_", "_Closed_")).toggle(),
        $("#" + t.replace("_Open_Image", "_Open_Text")).toggle(),
        $("#" + t.replace("_Open_Image", "_Closed_Text")).toggle()) : IsCodeCollapseNode(t, "_Closed_Image") && ($("#" + t.replace("_Closed_", "_Open_")).toggle(),
            $("#" + t.replace("_Closed_Image", "_Open_Text")).toggle(),
            $("#" + t.replace("_Closed_Image", "_Closed_Text")).toggle())
}
function fix_code_collapse_img(n) {
    if (IsCodeCollapseNode(n.id, "_Open_Image")) {
        var t = n.id.replace("_Open_Image", "_Closed_Image")
            , i = n.id.replace("_Open_Image", "_Open_Text")
            , r = n.id.replace("_Open_Image", "_Closed_Text");
        n.onclick = function () {
            $(this).hide();
            $("#" + t + "").show();
            $("#" + i + "").hide();
            $("#" + r + "").show()
        }
    } else if (IsCodeCollapseNode(n.id, "_Closed_Image")) {
        var t = n.id.replace("_Closed_Image", "_Open_Image")
            , i = n.id.replace("_Closed_Image", "_Open_Text")
            , r = n.id.replace("_Closed_Image", "_Closed_Text");
        n.onclick = function () {
            $(this).hide();
            $("#" + t + "").show();
            $("#" + i + "").show();
            $("#" + r + "").hide()
        }
    }
}
function IsCodeCollapseNode(n, t) {
    return n.indexOf(t) >= 0
}
function fix_code_collapse_span(n) {
    var t;
    /Codehighlighter1_\d+_\d+_Closed_Text/ig.test(n.id) && $(n).hide();
    t = /Codehighlighter1_\d+_\d+_Open_Text/ig;
    t.test(n.id) && $(n).show()
}
function change_onclick(n, t) {
    if (t) {
        var i = eval("(function(){" + t + "});");
        $(n).attr("onclick", "").click(i)
    }
}
function showRemoveLineNumber(n) {
    $(n).append('<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a  onclick="removeLineNumber(this);return false;">消除行号<\/a><\/span>')
}
function showCopyCode(n) {
    if ($(n).height() > 120) {
        var t = '<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a  onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"/><\/a><\/span>';
        $(n).prepend(t).append(t)
    }
}
function removeLineNumber(n) {
    var t = $(n).parent().parent().parent()
        , i = $(t).html().replace(/<span style=\"color: #008080;?\">\s*(&nbsp;)?(\d+)<\/span>/gi, "");
    $(t).html(i)
}
function loadEncoderJs() {
    var n = document.createElement("script"), t;
    n.type = "text/javascript";
    n.src = location.protocol + "//common.cnblogs.com/script/encoder.js";
    t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(n, t)
}
function copyCnblogsCode(n) {
    var i = getCnblogsCodeContainer(n), f = getCnblogsCodeText(i), r = document.createElement("div"), t = document.createElement("textarea"), u;
    $(t).val(f);
    $(t).css("width", $(i).width());
    u = $(i).height() * .8;
    u > 600 && (u = 600);
    $(t).css("height", u);
    $(t).css("font-family", "Courier New");
    $(t).css("font-size", "12px");
    $(t).css("line-height", "1.5");
    $(i).children().appendTo($(r));
    $(i).children().remove();
    $(i).append(r);
    $(r).hide();
    $(t).appendTo($(i));
    $("<div>按 Ctrl+C 复制代码<\/div>").insertBefore($(t));
    $("<div>按 Ctrl+C 复制代码<\/div>").insertAfter($(t));
    $(t).select();
    $(t).blur(function () {
        $(t).prev().remove();
        $(t).next().remove();
        $(t).remove();
        $(i).html($(r).html());
        bindCodeCollapseImages()
    })
}
function getCnblogsCodeContainer(n) {
    var t = $(n).closest("pre");
    return t.length === 0 && (t = $(n).closest("div.cnblogs_code")),
        t
}
function getCnblogsCodeText(n) {
    var r = $(n).text().trim(), i, u, t, f;
    for (r = r.replace(/\r\n/g, "\n"),
        r = r.replace(/\nView Code/g, ""),
        i = r.split("\n").filter(function (n) {
            return n
        }),
        u = !0,
        t = 1; t <= i.length; t++) {
        if (i[t - 1] = i[t - 1].trim(),
            u = i[t - 1].indexOf(t) === 0,
            !u)
            break;
        i[t - 1] = i[t - 1].substr(t.toString().length) + "\n";
        i[t - 1][0] === " " && (i[t - 1] = i[t - 1].substr(1))
    }
    if (u)
        for (r = "",
            f = 0; f < i.length; f++)
            r += i[f];
    return typeof Encoder != undefined && (r = Encoder.htmlDecode(r)),
        $.trim(r)
}
function showRunCode(n) {
    var t = $(n).find("div.cnblogs_code_toolbar");
    t.length && $(t).append('<span class="cnblogs_code_runjs"><a  onclick="runJsCode(this)">运行代码<\/a><\/span>')
}
function runJsCode(n) {
    var i = getCnblogsCodeContainer(n)
        , r = getCnblogsCodeText(i)
        , t = window.open("", "_blank", "");
    t.document.open("text/html", "replace");
    t.opener = null;
    t.document.write(r);
    t.document.close()
}
function bindCodeCollapseImages() {
    $(".code_img_opened").off("click").click(function (n) {
        cnblogs_code_hide($(this).attr("id").substr(16), n)
    });
    $(".code_img_closed").off("click").click(function () {
        cnblogs_code_show($(this).attr("id").substr(16))
    })
}
function updatePostStats(n, t, i, r, u) {
    $.ajax({
        url: getAjaxBaseUrl() + "GetPostStat",
        method: "post",
        data: JSON.stringify(n),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (n) {
            for (var f = 0; f < n.length; f++)
                t && t(n[f].postId, n[f].viewCount),
                    i && i(n[f].postId, n[f].feedbackCount),
                    r && r(n[f].postId, n[f].diggCount),
                    u && u(n[f].postId, n[f].buryCount)
        }
    })
}
function log(n) {
    try {
        console.log(n)
    } catch (t) { }
}
function getAjaxBaseUrl() {
    var n = location.host.split(".")[0];
    return n.toLowerCase() === currentBlogApp.toLowerCase() ? "/ajax/" : "/" + currentBlogApp + "/ajax/"
}
function OpenWindow(n, t, i, r) {
    var u = (screen.width - t) / 2 - r
        , f = (screen.height - i) / 2 - r
        , e = window.open(n, "_blank", "width=" + t + ",height=" + i + ",toolbars=0,resizable=1,left=" + u + ",top=" + f);
    e.focus()
}
function hide_links() {
    document.getElementById("mini_nav_more").style.display = "none";
    document.getElementById("mini_nav_more_link_div").className = "mini_nav_more_link_hide"
}
function show_links() {
    document.getElementById("mini_nav_more").style.display = "block";
    document.getElementById("mini_nav_more_link_div").className = "mini_nav_more_link"
}
function WarpClass(n, t, i, r) {
    var e = document.getElementById(n)
        , u = document.getElementById(t)
        , f = document.getElementById(i);
    e && u && (u.style.display && u.style.display != "block" ? (u.style.display = "block",
        e.className = "UnWarp",
        r && eval(r),
        f && (f.style.display = "block")) : (u.style.display = "none",
            e.className = "Warp",
            f && (f.style.display = "none")))
}
function GetMeta(n) {
    for (var i = document.getElementsByTagName("meta"), t = 0; t < i.length; t++)
        if (i[t].name.toLowerCase() == n)
            return i[t].content;
    return ""
}
function AjaxPost(n, t, i) {
    $.ajax({
        url: n,
        data: t,
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: function (n) {
            i(n.d)
        },
        error: function () { }
    })
}
function escapeHTML(n) {
    var t = document.createElement("div")
        , i = document.createTextNode(n);
    return t.appendChild(i),
        t.innerHTML
}
function open_link(n) {
    return window.open(n),
        !1
}
function getHostPostfix() {
    var n = location.hostname;
    return n.substring(n.lastIndexOf("."), n.length)
}
function shBushPathPrepare() {
    for (var t = arguments, i = [], n = 0; n < t.length; n++)
        i.push(t[n].replace("@", location.protocol + "//common.cnblogs.com/script/sh/"));
    return i
}
function runJsCode(n) {
    var i = document.getElementById(n)
        , t = window.open("about:blank", "runWindow");
    t.opener = null;
    t.document.open();
    t.document.write(i.value);
    t.document.close()
}
function incrementViewCount(n) {
    n && $.ajax({
        url: "https://count.cnblogs.com/blog/post/" + n,
        type: "put",
        xhrFields: {
            withCredentials: !0
        },
        crossDomain: !0
    })
}
function votePost(n, t, i) {
    if (!n) {
        $("#digg_tips").html("推荐出错误！postId不正确");
        return
    }
    i || (i = !1);
    var r = {
        postId: +n,
        voteType: t,
        isAbandoned: i
    };
    $("#digg_tips").css("color", "red").html("提交中...");
    $.ajax({
        url: getAjaxBaseUrl() + "vote/blogpost",
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(r),
        headers: {
            RequestVerificationToken: $("#antiforgery_token").val()
        },
        success: function (n) {
            if (n.isSuccess) {
                var i = $("#" + t.toLowerCase() + "_count");
                r.isAbandoned ? $(i).html(parseInt($(i).html()) - 1) : $(i).html(parseInt($(i).html()) + 1)
            }
            $("#digg_tips").html(n.message)
        },
        error: function (n, t) {
            n.status > 0 && (n.status === 500 ? $("#digg_tips").html("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com") : n.stack === 429 ? $("#digg_tips").html("抱歉，提交过于频繁，请稍后再试") : ($("#digg_tips").html("抱歉，发生了错误，请尝试刷新页面！"),
                console.log("点赞失败，" + n.status + ", textStatus" + t)))
        }
    })
}
function DiggIt(n, t, i) {
    i === 1 && votePost(n, "Digg", !1)
}
function voteComment(n, t, i, r) {
    var u = buildVoteNode(t, i), f;
    return n ? (r || (r = !1),
        f = {
            postId: cb_entryId,
            commentId: +n,
            voteType: t,
            isAbandoned: r
        },
        r ? u.decreaseCommentVoteCount(u.current) : u.increaseCommentVoteCount(u.current),
        $.ajax({
            url: getAjaxBaseUrl() + "vote/comment",
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(f),
            headers: {
                RequestVerificationToken: $("#antiforgery_token").val()
            },
            success: function (i) {
                i.isSuccess ? (u.clearErrorMessage(),
                    r ? ($(u.current).html($(u.current).html().trim().substring(2)),
                        $(u.current).attr("onclick", "voteComment(" + n + ", '" + t + "', this.parentElement, false)")) : ($(u.current).html("取消" + $(u.current).html().trim()),
                            $(u.current).attr("onclick", "voteComment(" + n + ", '" + t + "', this.parentElement, true)"))) : (r ? u.increaseCommentVoteCount(u.current) : u.decreaseCommentVoteCount(u.current),
                                i.message && i.message.indexOf("System.") < 0 ? u.showErrorMessage(i.message) : u.showErrorMessage("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com"),
                                i.id ? i.id === 1 ? ($(u.digg).html("取消支持(" + u.getCommentVoteCount(u.digg) + ")"),
                                    $(u.digg).attr("onclick", "voteComment(" + n + ", 'Digg', this.parentElement, true)")) : i.id === 2 && ($(u.bury).html("取消反对(" + u.getCommentVoteCount(u.bury) + ")"),
                                        $(u.bury).attr("onclick", "voteComment(" + n + ", 'Bury', this.parentElement, true)")) : ($(u.digg).removeAttr("href").removeAttr("onclick"),
                                            $(u.bury).removeAttr("href").removeAttr("onclick")))
            },
            error: function (n, t) {
                n.status > 0 && (n.status === 500 ? u.showErrorMessage("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com") : n.status === 429 ? u.showErrorMessage("抱歉，提交过于频繁，请稍后再试！") : (u.showErrorMessage("抱歉！发生了错误！请刷新页面后重试。"),
                    console.log(n.status + ", errorTestStatus" + t)))
            }
        }),
        !1) : (u.showErrorMessage("推荐出错！commentId不正确"),
            !1)
}
function google_analytics(n, t, i, r, u, f, e) {
    n.GoogleAnalyticsObject = u;
    n[u] = n[u] || function () {
        (n[u].q = n[u].q || []).push(arguments)
    }
        ;
    n[u].l = 1 * new Date;
    f = t.createElement(i);
    e = t.getElementsByTagName(i)[0];
    f.async = 1;
    f.src = r;
    e.parentNode.insertBefore(f, e)
}
function google_ga() {
    try {
        google_analytics(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
        ga("create", "UA-476124-1", "auto");
        ga("set", "dimension1", skinName);
        isLogined && ga("set", "userId", visitorUserId);
        currentPostDateAdded && ga("set", "dimension2", currentPostDateAdded);
        ga("send", "pageview")
    } catch (n) { }
}
function enableGoogleAnalytics() {
    return typeof currentBlogId != "undefined" && currentBlogId == 193295 ? !1 : !0
}
function GetJobList() {
    try {
        $("#job_list").html("数据加载中...");
        $.ajax({
            url: "/ws/BlogAjaxService.asmx/GetJobList",
            data: "{}",
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: function (n) {
                $("#job_list").html(n.d)
            }
        })
    } catch (n) { }
}
function getRecommendedList() {
    var t = {
        itemId: cb_entryId,
        itemTitle: $("#cb_post_title_url").text()
    }
        , n = $("#under_post_news");
    $.ajax({
        url: "https://recomm.cnblogs.com/api/v2/recomm/blogpost/reco",
        type: "POST",
        data: JSON.stringify(t),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 6e3,
        xhrFields: {
            withCredentials: !0
        },
        success: function (t) {
            var r, i;
            if (t && t.length >= 5) {
                for (r = '<div class="recomm-block"><b>相关博文：<\/b><br>',
                    i = 0; i < t.length && i < 5; i++)
                    r += '·  <a title="' + t[i].title + '" href="' + t[i].url.replace("http://", "https://") + '" target="_blank" onclick="clickRecomItmem(' + t[i].itemId + ')">' + t[i].title + "<\/a><br />";
                r += '»  <a target="_blank" href="https://recomm.cnblogs.com/blogpost/' + cb_entryId + '">更多推荐...<\/a>';
                $.ajax({
                    url: "https://a1.cnblogs.com/adunits/t5/nocache",
                    type: "get",
                    dataType: "html",
                    success: function (t) {
                        t && (r += '<div id="cnblogs_t5">' + t + "<\/div>");
                        $(n).html(r)
                    }
                })
            } else
                $(n).hide()
        },
        error: function () {
            $(n).hide()
        }
    })
}
function sendRecommView(n) {
    $.ajax({
        url: "https://recomm.cnblogs.com/api/v2/recomm/blogpost/show-items",
        type: "POST",
        data: JSON.stringify(n),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
}
function clickRecomItmem(n) {
    var t = {
        itemId: n,
        sourceId: cb_entryId
    };
    $.ajax({
        url: "https://recomm.cnblogs.com/api/v2/recomm/blogpost/click-item",
        type: "POST",
        data: JSON.stringify(t),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        xhrFields: {
            withCredentials: !0
        }
    })
}
function zzk_go() {
    var n = encodeURIComponent("blog:" + currentBlogApp + " " + document.getElementById("q").value);
    window.location = "http://zzk.cnblogs.com/s?w=" + n
}
function zzk_go_enter(n) {
    if (n.keyCode === 13)
        return zzk_go(),
            !1
}
function google_go() {
    return location.href = "http://www.google.com/search?q=" + encodeURIComponent("site:www.cnblogs.com/" + currentBlogApp + "/ " + document.getElementById("google_q").value),
        !1
}
function google_go_enter(n) {
    if (n.keyCode === 13)
        return google_go(),
            !1
}
function PutInWz() {
    var n = 480
        , t = 360
        , i = (screen.width - n) / 2
        , r = (screen.height - t) / 2
        , u = document
        , f = document.getElementsByTagName("title")[0].innerHTML;
    window.open("http://wz.cnblogs.com/create?t=" + encodeURIComponent(f) + "&u=" + encodeURIComponent(u.location.href) + "&c=" + encodeURIComponent("") + "&i=0", "_blank", "width=" + n + ",height=" + t + ",toolbars=0,resizable=1,left=" + i + ",top=" + r)
}
function AddToWz(n) {
    var r = 480, u = 400, e = (screen.width - r) / 2, o = (screen.height - u) / 2, s = document, t = document.getElementsByTagName("title")[0].innerHTML, f = 1, i;
    try {
        t = window.btoa(unescape(encodeURIComponent(t)))
    } catch (h) {
        t = encodeURIComponent(t.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
        f = 0
    }
    i = "http://wz.cnblogs.com/create?t=" + t + "&u=" + encodeURIComponent(s.location.href) + "&c=" + encodeURIComponent("") + "&bid=" + n + "&i=0";
    f == 1 && (i += "&base64=1");
    window.open(i, "_blank", "width=" + r + ",height=" + u + ",toolbars=0,resizable=1,left=" + e + ",top=" + o)
}
function follow(n) {
    loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", function () {
        loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-min.js", function () {
            if (!isLogined) {
                login();
                return
            }
            if (c_has_follwed) {
                var t = dialog({
                    content: "你已经关注过该博主！"
                });
                return t.show(),
                    setTimeout(function () {
                        t.close().remove()
                    }, 2e3),
                    !1
            }
            n || (n = cb_blogUserGuid);
            $("#author_profile_follow").html("<span class='color:red'>正在处理中...<\/span>");
            $.ajax({
                url: getAjaxBaseUrl() + "Follow/FollowBlogger.aspx",
                data: '{"blogUserGuid":"' + n + '"}',
                dataType: "text",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (t) {
                    t == "未登录" ? login() : (showFollowMsg(t),
                        t == "关注成功" && followByGroup(n, !0))
                },
                error: function (n) {
                    n.status > 0 && showFollowMsg("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com")
                }
            })
        })
    })
}
function followByGroup(n, t) {
    loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-plus-min.js", function () {
        var r = $("#author_profile_detail").children("a").first().text()
            , i = dialog({
                width: 480,
                height: t ? 450 : 420,
                title: "关注成功，设置备注名称与分组",
                url: "https://home.cnblogs.com/follow_group/Index/?enableSetRemark=" + t,
                oniframeload: function () {
                    var u = this.iframeNode.contentWindow;
                    u.postMessage({
                        name: r,
                        currentUserId: n,
                        remark: "",
                        enableSetRemark: t
                    }, "https://home.cnblogs.com");
                    window.addEventListener("message", function (n) {
                        if (n.data.IsSucceed != undefined && n.data.IsSucceed != null && n.data.IsSucceed) {
                            var t = dialog({
                                content: "保存成功！"
                            });
                            t.show();
                            setTimeout(function () {
                                t.close().remove()
                            }, 2e3)
                        }
                        i.close().remove()
                    }, !1)
                }
            });
        i.show()
    })
}
function showFollowMsg(n) {
    $("#author_profile_follow").html('<span style="color:red">' + n + "<\/span>");
    $("#p_b_follow").html('<span style="color:red">' + n + "<\/span>");
    green_channel_success($("#green_channel_follow"), n)
}
function unfollow(n) {
    loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", function () {
        loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-min.js", function () {
            var t = dialog({
                title: "取消关注",
                content: "您确定要取消关注吗？",
                okValue: "不关注了",
                ok: function () {
                    $("#author_profile_follow").html("<span style='color:red'>正在处理中...<\/span>");
                    $.ajax({
                        url: getAjaxBaseUrl() + "Follow/RemoveFollow.aspx",
                        data: '{"blogUserGuid":"' + n + '"}',
                        dataType: "text",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (n) {
                            n == "未登录" ? login() : showFollowMsg(n)
                        },
                        error: function (n) {
                            n.status > 0 && showFollowMsg("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com")
                        }
                    })
                },
                cancelValue: "再考虑一下",
                cancel: function () { }
            });
            t.show()
        })
    })
}
function getFollowStatus(n) {
    $.ajax({
        url: getAjaxBaseUrl() + "Follow/GetFollowStatus.aspx",
        data: {
            blogUserGuid: n
        },
        cache: !1,
        dataType: "text",
        type: "get",
        success: function (n) {
            $("#p_b_follow").html(n)
        }
    })
}
function loadScript(n, t) {
    if (document.getElementById(n)) {
        t();
        return
    }
    var i = document.createElement("script");
    i.id = n;
    i.type = "text/javascript";
    i.readyState ? i.onreadystatechange = function () {
        (i.readyState == "loaded" || i.readyState == "complete") && (i.onreadystatechange = null,
            t())
    }
        : i.onload = function () {
            t()
        }
        ;
    i.src = n;
    document.getElementsByTagName("head")[0].appendChild(i)
}
function loadLink(n, t) {
    if (document.getElementById(n)) {
        t();
        return
    }
    var i = document.createElement("link");
    i.id = n;
    i.rel = "stylesheet";
    i.readyState ? i.onreadystatechange = function () {
        (i.readyState == "loaded" || i.readyState == "complete") && (i.onreadystatechange = null,
            t())
    }
        : i.onload = function () {
            t()
        }
        ;
    i.href = n;
    document.getElementsByTagName("head")[0].appendChild(i)
}
function deliverBigBanner() {
    try {
        new BigBannerDelivery(skinName).deliver()
    } catch (n) {
        console.log(n)
    }
}
function BigBannerDelivery(n) {
    this.skinName = n;
    this.bannerId = "big_banner";
    this.cookieName = "blog-big-banner";
    this.creative = null;
    this.canShowBanner = function () {
        var n = new Date;
        return $.inArray(this.skinName, ["CodingLife", "LessIsMoreRight", "LessIsMore", "BlackLowKey", "AnotherEon001", "darkgreentrip", "red_autumnal_leaves", "ThinkInside", "SimpleClear", "summerGarden"]) !== -1 && !isLogined && screen.width > 1024 && (document.cookie == null || document.cookie.indexOf(this.cookieName) < 0) ? !0 : !1
    }
        ;
    this.deliverToSkin = function () {
        var n = document.createElement("div"), i, r, t;
        n.id = this.bannerId;
        n.style.width = "1024px";
        n.style.margin = "10px auto";
        i = this.getCreative(n.style.width);
        n.appendChild(i);
        r = this;
        t = document.createElement("span");
        t.id = "bigbanner_close";
        t.innerText = "x";
        t.addEventListener("click", function () {
            r.closeAd()
        }, !1);
        n.appendChild(t);
        n.style.display = "none";
        document.body.insertBefore(n, document.body.firstChild);
        $("#" + n.id).slideDown(500);
        this.logImpression(this.creative.id);
        this.skinName == "LessIsMoreRight" && (document.getElementById("sideBar").style.top = "400px");
        setTimeout(this.takeAway, 1e4)
    }
        ;
    this.takeAway = function () {
        var n = $("#big_banner")
            , t = this.skinName;
        $(n).fadeOut("500", function () {
            $(n).hide();
            t == "LessIsMoreRight" && (document.getElementById("sideBar").style.top = "120px")
        })
    }
        ;
    this.clickThrough = function (n) {
        $.ajax({
            url: "/ajax/bigbanner/click",
            type: "post",
            data: JSON.stringify({
                id: n
            }),
            contentType: "application/json; charset=UTF-8"
        })
    }
        ;
    this.logImpression = function (n) {
        $.ajax({
            url: "/ajax/bigbanner/impression",
            type: "post",
            data: JSON.stringify({
                id: n
            }),
            contentType: "application/json; charset=UTF-8"
        })
    }
        ;
    this.getCreative = function (n) {
        var u = this, r = this.creative, t = document.createElement("a"), i;
        return t.href = r.clickThroughUrl,
            t.target = "_blank",
            t.addEventListener("click", function () {
                u.clickAd()
            }, !1),
            i = document.createElement("img"),
            i.src = r.imageUrl,
            i.style.width = n,
            t.appendChild(i),
            t
    }
        ;
    this.setBannerCookie = function (n) {
        var t, i;
        n != 0 && (t = new Date,
            t.setTime(t.getTime() + n * 6e4),
            i = "; expires=" + t.toUTCString(),
            document.cookie = this.cookieName + "=close" + i + "; path=/")
    }
}
function provisionWechatShare() {
    var i = document.querySelector('meta[name="description"]'), n, t;
    i && (n = "https://common.cnblogs.com/logo_square.png",
        t = document.querySelector("#cnblogs_post_body img"),
        t && (n = t.src),
        $.getScript("https://res.wx.qq.com/open/js/jweixin-1.6.0.js", function () {
            var t = location.href.replace("//www.cnblogs.com/", "/w.cnblogs.com/")
                , r = new URL(t);
            r.hash = "";
            $.getJSON("/ajax/wechatshare/getconfig?url=" + encodeURIComponent(r.toString())).done(function (r) {
                wx.config(r);
                wx.ready(function () {
                    wx.updateAppMessageShareData({
                        title: document.title,
                        desc: i.content,
                        link: t,
                        imgUrl: n,
                        fail: function (n) {
                            console.log(n)
                        }
                    });
                    wx.updateTimelineShareData({
                        title: document.title,
                        link: t,
                        imgUrl: n
                    })
                });
                wx.error(function (n) {
                    console.log(n)
                })
            })
        }))
}
var accountBaseAddress, account, JSON, getMarkdownEditor, initCommentEditor, currentDelElement, currentCommentID, insertUBB, tagOrderer, initTagsManager, buildVoteNode;
$(function () {
    $.ajax({
        type: "get",
        url: "https://account.cnblogs.com/user/userinfo",
        xhrFields: {
            withCredentials: !0
        },
        success: function (n) {
            if (n) {
                $("#navblog-myblog-icon").attr("href", n.blogLink);
                $("#navblog-myblog-text").attr("href", n.blogLink);
                n.iconName.indexOf("/sample_face.gif") < 0 && $("#user_icon, #user_icon_mobile").attr("src", n.iconName);
                $("#user_icon, #user_icon_mobile").parent().attr("href", n.homeLink);
                n.unreadMsg === 0 ? $("#msg_count").hide() : ($("#msg_count").text(n.unreadMsg === 0 ? "" : n.unreadMsg),
                    $("#msg_count").show());
                $(".navbar-anonymous").hide();
                $(".navbar-user-info").show();
                return
            }
            $(".navbar-user-info").hide();
            $(".navbar-anonymous").show()
        },
        error: function () {
            $(".navbar-anonymous").show();
            $(".navbar-user-info").hide()
        }
    })
});
accountBaseAddress = "https://account.cnblogs.com";
account = {
    login: function (n) {
        var t = location.href;
        return n && t.indexOf("#" + n) < 0 && (t += "#" + n),
            location.href = accountBaseAddress + "/signin?returnUrl=" + encodeURIComponent(t),
            !1
    },
    logout: function () {
        return confirm("确认退出吗？") && $.ajax({
            type: "POST",
            url: "https://account.cnblogs.com/signout",
            xhrFields: {
                withCredentials: !0
            },
            complete: function (n) {
                n.status === 200 && location.reload(!0)
            }
        }),
            !1
    },
    register: function () {
        return location.href = accountBaseAddress + "/signup?returnUrl=" + encodeURIComponent(location.href),
            !1
    }
},
    function () {
        var n = Object.create(null);
        n.get = function () { }
            ;
        n.set = n.get;
        n.enumerable = !1;
        Object.defineProperty(window, "BTWPlugin", n)
    }();
JSON || (JSON = {}),
    function () {
        "use strict";
        function i(n) {
            return n < 10 ? "0" + n : n
        }
        function o(n) {
            return e.lastIndex = 0,
                e.test(n) ? '"' + n.replace(e, function (n) {
                    var t = s[n];
                    return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + n + '"'
        }
        function u(i, f) {
            var s, l, h, a, v = n, c, e = f[i];
            e && typeof e == "object" && typeof e.toJSON == "function" && (e = e.toJSON(i));
            typeof t == "function" && (e = t.call(f, i, e));
            switch (typeof e) {
                case "string":
                    return o(e);
                case "number":
                    return isFinite(e) ? String(e) : "null";
                case "boolean":
                case "null":
                    return String(e);
                case "object":
                    if (!e)
                        return "null";
                    if (n += r,
                        c = [],
                        Object.prototype.toString.apply(e) === "[object Array]") {
                        for (a = e.length,
                            s = 0; s < a; s += 1)
                            c[s] = u(s, e) || "null";
                        return h = c.length === 0 ? "[]" : n ? "[\n" + n + c.join(",\n" + n) + "\n" + v + "]" : "[" + c.join(",") + "]",
                            n = v,
                            h
                    }
                    if (t && typeof t == "object")
                        for (a = t.length,
                            s = 0; s < a; s += 1)
                            typeof t[s] == "string" && (l = t[s],
                                h = u(l, e),
                                h && c.push(o(l) + (n ? ": " : ":") + h));
                    else
                        for (l in e)
                            Object.prototype.hasOwnProperty.call(e, l) && (h = u(l, e),
                                h && c.push(o(l) + (n ? ": " : ":") + h));
                    return h = c.length === 0 ? "{}" : n ? "{\n" + n + c.join(",\n" + n) + "\n" + v + "}" : "{" + c.join(",") + "}",
                        n = v,
                        h
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z" : null
        }
            ,
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                return this.valueOf()
            }
        );
        var f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, n, r, s = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, t;
        typeof JSON.stringify != "function" && (JSON.stringify = function (i, f, e) {
            var o;
            if (n = "",
                r = "",
                typeof e == "number")
                for (o = 0; o < e; o += 1)
                    r += " ";
            else
                typeof e == "string" && (r = e);
            if (t = f,
                f && typeof f != "function" && (typeof f != "object" || typeof f.length != "number"))
                throw new Error("JSON.stringify");
            return u("", {
                "": i
            })
        }
        );
        typeof JSON.parse != "function" && (JSON.parse = function (n, t) {
            function r(n, i) {
                var f, e, u = n[i];
                if (u && typeof u == "object")
                    for (f in u)
                        Object.prototype.hasOwnProperty.call(u, f) && (e = r(u, f),
                            e !== undefined ? u[f] = e : delete u[f]);
                return t.call(n, i, u)
            }
            var i;
            if (n = String(n),
                f.lastIndex = 0,
                f.test(n) && (n = n.replace(f, function (n) {
                    return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
                })),
                /^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                return i = eval("(" + n + ")"),
                    typeof t == "function" ? r({
                        "": i
                    }, "") : i;
            throw new SyntaxError("JSON.parse");
        }
        )
    }();
eval(function (n, t, i, r, u, f) {
    if (u = function (n) {
        return (n < t ? "" : u(parseInt(n / t))) + ((n = n % t) > 35 ? String.fromCharCode(n + 29) : n.toString(36))
    }
        ,
        !"".replace(/^/, String)) {
        while (i--)
            f[u(i)] = r[i] || u(i);
        r = [function (n) {
            return f[n]
        }
        ];
        u = function () {
            return "\\w+"
        }
            ;
        i = 1
    }
    while (i--)
        r[i] && (n = n.replace(new RegExp("\\b" + u(i) + "\\b", "g"), r[i]));
    return n
}('K M;I(M)1S 2U("2a\'t 4k M 4K 2g 3l 4G 4H");(6(){6 r(f,e){I(!M.1R(f))1S 3m("3s 15 4R");K a=f.1w;f=M(f.1m,t(f)+(e||""));I(a)f.1w={1m:a.1m,19:a.19?a.19.1a(0):N};H f}6 t(f){H(f.1J?"g":"")+(f.4s?"i":"")+(f.4p?"m":"")+(f.4v?"x":"")+(f.3n?"y":"")}6 B(f,e,a,b){K c=u.L,d,h,g;v=R;5K{O(;c--;){g=u[c];I(a&g.3r&&(!g.2p||g.2p.W(b))){g.2q.12=e;I((h=g.2q.X(f))&&h.P===e){d={3k:g.2b.W(b,h,a),1C:h};1N}}}}5v(i){1S i}5q{v=11}H d}6 p(f,e,a){I(3b.Z.1i)H f.1i(e,a);O(a=a||0;a<f.L;a++)I(f[a]===e)H a;H-1}M=6(f,e){K a=[],b=M.1B,c=0,d,h;I(M.1R(f)){I(e!==1d)1S 3m("2a\'t 5r 5I 5F 5B 5C 15 5E 5p");H r(f)}I(v)1S 2U("2a\'t W 3l M 59 5m 5g 5x 5i");e=e||"";O(d={2N:11,19:[],2K:6(g){H e.1i(g)>-1},3d:6(g){e+=g}};c<f.L;)I(h=B(f,c,b,d)){a.U(h.3k);c+=h.1C[0].L||1}Y I(h=n.X.W(z[b],f.1a(c))){a.U(h[0]);c+=h[0].L}Y{h=f.3a(c);I(h==="[")b=M.2I;Y I(h==="]")b=M.1B;a.U(h);c++}a=15(a.1K(""),n.Q.W(e,w,""));a.1w={1m:f,19:d.2N?d.19:N};H a};M.3v="1.5.0";M.2I=1;M.1B=2;K C=/\\$(?:(\\d\\d?|[$&`\'])|{([$\\w]+)})/g,w=/[^5h]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=11,u=[],n={X:15.Z.X,1A:15.Z.1A,1C:1r.Z.1C,Q:1r.Z.Q,1e:1r.Z.1e},x=n.X.W(/()??/,"")[1]===1d,D=6(){K f=/^/g;n.1A.W(f,"");H!f.12}(),y=6(){K f=/x/g;n.Q.W("x",f,"");H!f.12}(),E=15.Z.3n!==1d,z={};z[M.2I]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S]))/;z[M.1B]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1h=6(f,e,a,b){u.U({2q:r(f,"g"+(E?"y":"")),2b:e,3r:a||M.1B,2p:b||N})};M.2n=6(f,e){K a=f+"/"+(e||"");H M.2n[a]||(M.2n[a]=M(f,e))};M.3c=6(f){H r(f,"g")};M.5l=6(f){H f.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,"\\\\$&")};M.5e=6(f,e,a,b){e=r(e,"g"+(b&&E?"y":""));e.12=a=a||0;f=e.X(f);H b?f&&f.P===a?f:N:f};M.3q=6(){M.1h=6(){1S 2U("2a\'t 55 1h 54 3q")}};M.1R=6(f){H 53.Z.1q.W(f)==="[2m 15]"};M.3p=6(f,e,a,b){O(K c=r(e,"g"),d=-1,h;h=c.X(f);){a.W(b,h,++d,f,c);c.12===h.P&&c.12++}I(e.1J)e.12=0};M.57=6(f,e){H 6 a(b,c){K d=e[c].1I?e[c]:{1I:e[c]},h=r(d.1I,"g"),g=[],i;O(i=0;i<b.L;i++)M.3p(b[i],h,6(k){g.U(d.3j?k[d.3j]||"":k[0])});H c===e.L-1||!g.L?g:a(g,c+1)}([f],0)};15.Z.1p=6(f,e){H J.X(e[0])};15.Z.W=6(f,e){H J.X(e)};15.Z.X=6(f){K e=n.X.1p(J,14),a;I(e){I(!x&&e.L>1&&p(e,"")>-1){a=15(J.1m,n.Q.W(t(J),"g",""));n.Q.W(f.1a(e.P),a,6(){O(K c=1;c<14.L-2;c++)I(14[c]===1d)e[c]=1d})}I(J.1w&&J.1w.19)O(K b=1;b<e.L;b++)I(a=J.1w.19[b-1])e[a]=e[b];!D&&J.1J&&!e[0].L&&J.12>e.P&&J.12--}H e};I(!D)15.Z.1A=6(f){(f=n.X.W(J,f))&&J.1J&&!f[0].L&&J.12>f.P&&J.12--;H!!f};1r.Z.1C=6(f){M.1R(f)||(f=15(f));I(f.1J){K e=n.1C.1p(J,14);f.12=0;H e}H f.X(J)};1r.Z.Q=6(f,e){K a=M.1R(f),b,c;I(a&&1j e.58()==="3f"&&e.1i("${")===-1&&y)H n.Q.1p(J,14);I(a){I(f.1w)b=f.1w.19}Y f+="";I(1j e==="6")c=n.Q.W(J,f,6(){I(b){14[0]=1f 1r(14[0]);O(K d=0;d<b.L;d++)I(b[d])14[0][b[d]]=14[d+1]}I(a&&f.1J)f.12=14[14.L-2]+14[0].L;H e.1p(N,14)});Y{c=J+"";c=n.Q.W(c,f,6(){K d=14;H n.Q.W(e,C,6(h,g,i){I(g)5b(g){24"$":H"$";24"&":H d[0];24"`":H d[d.L-1].1a(0,d[d.L-2]);24"\'":H d[d.L-1].1a(d[d.L-2]+d[0].L);5a:i="";g=+g;I(!g)H h;O(;g>d.L-3;){i=1r.Z.1a.W(g,-1)+i;g=1Q.3i(g/10)}H(g?d[g]||"":"$")+i}Y{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&f.1J)f.12=0;H c};1r.Z.1e=6(f,e){I(!M.1R(f))H n.1e.1p(J,14);K a=J+"",b=[],c=0,d,h;I(e===1d||+e<0)e=5D;Y{e=1Q.3i(+e);I(!e)H[]}O(f=M.3c(f);d=f.X(a);){I(f.12>c){b.U(a.1a(c,d.P));d.L>1&&d.P<a.L&&3b.Z.U.1p(b,d.1a(1));h=d[0].L;c=f.12;I(b.L>=e)1N}f.12===d.P&&f.12++}I(c===a.L){I(!n.1A.W(f,"")||h)b.U("")}Y b.U(a.1a(c));H b.L>e?b.1a(0,e):b};M.1h(/\\(\\?#[^)]*\\)/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"});M.1h(/\\((?!\\?)/,6(){J.19.U(N);H"("});M.1h(/\\(\\?<([$\\w]+)>/,6(f){J.19.U(f[1]);J.2N=R;H"("});M.1h(/\\\\k<([\\w$]+)>/,6(f){K e=p(J.19,f[1]);H e>-1?"\\\\"+(e+1)+(3R(f.2S.3a(f.P+f[0].L))?"":"(?:)"):f[0]});M.1h(/\\[\\^?]/,6(f){H f[0]==="[]"?"\\\\b\\\\B":"[\\\\s\\\\S]"});M.1h(/^\\(\\?([5A]+)\\)/,6(f){J.3d(f[1]);H""});M.1h(/(?:\\s+|#.*)+/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"},M.1B,6(){H J.2K("x")});M.1h(/\\./,6(){H"[\\\\s\\\\S]"},M.1B,6(){H J.2K("s")})})();1j 2e!="1d"&&(2e.M=M);K 1v=6(){6 r(a,b){a.1l.1i(b)!=-1||(a.1l+=" "+b)}6 t(a){H a.1i("3e")==0?a:"3e"+a}6 B(a){H e.1Y.2A[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3G:[a.2G],h={"#":"1c",".":"1l"}[b.1o(0,1)]||"3h",g,i;g=h!="3h"?b.1o(1):b.5u();I((a[h]||"").1i(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1P.5y;I(!g.1F){g.1F=g.52;g.3N=6(){J.5w=11}}c.W(d||1P,g)}a.3g?a.3g("4U"+b,h):a.4y(b,h,11)}6 A(a,b){K c=e.1Y.2j,d=N;I(c==N){c={};O(K h 2g e.1U){K g=e.1U[h];d=g.4x;I(d!=N){g.1V=h.4w();O(g=0;g<d.L;g++)c[d[g]]=h}}e.1Y.2j=c}d=e.1U[c[a]];d==N&&b!=11&&1P.1X(e.13.1x.1X+(e.13.1x.3E+a));H d}6 v(a,b){O(K c=a.1e("\\n"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1K("\\n")}6 u(a,b){I(a==N||a.L==0||a=="\\n")H a;a=a.Q(/<\/g,"&1y;");a=a.Q(/ {2,}/g,6(c){O(K d="",h=0;h<c.L-1;h++)d+=e.13.1W;H d+" "});I(b!=N)a=v(a,6(c){I(c.L==0)H"";K d="";c=c.Q(/^(&2s;| )+/,6(h){d=h;H""});I(c.L==0)H d;H d+\'<17 1g="\'+b+\'">\'+c+"<\/17>"});H a}6 n(a,b){a.1e("\\n");O(K c="",d=0;d<50;d++)c+="                    ";H a=v(a,6(h){I(h.1i("\\t")==-1)H h;O(K g=0;(g=h.1i("\\t"))!=-1;)h=h.1o(0,g)+c.1o(0,b-g%b)+h.1o(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,"")}6 D(a,b){I(a.P<b.P)H-1;Y I(a.P>b.P)H 1;Y I(a.L<b.L)H-1;Y I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2D?b.2D:c;(d=b.1I.X(a))!=N;){K i=g(d,b);I(1j i=="3f")i=[1f e.2L(i,d.P,b.23)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1G;|&1y;).*)/;H a.Q(e.3A.3M,6(c){K d="",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H\'<a 2h="\'+c+\'">\'+c+"<\/a>"+d})}6 z(){O(K a=1E.36("1k"),b=[],c=0;c<a.L;c++)a[c].3s=="20"&&b.U(a[c]);H b}6 f(a){a=a.1F;K b=p(a,".20",R);a=p(a,".3O",R);K c=1E.4i("3t");I(!(!a||!b||p(a,"3t"))){B(b.1c);r(b,"1m");O(K d=a.3G,h=[],g=0;g<d.L;g++)h.U(d[g].4z||d[g].4A);h=h.1K("\\r");c.39(1E.4D(h));a.39(c);c.2C();c.4C();w(c,"4u",6(){c.2G.4E(c);b.1l=b.1l.Q("1m","")})}}I(1j 3F!="1d"&&1j M=="1d")M=3F("M").M;K e={2v:{"1g-27":"","2i-1s":1,"2z-1s-2t":11,1M:N,1t:N,"42-45":R,"43-22":4,1u:R,16:R,"3V-17":R,2l:11,"41-40":R,2k:11,"1z-1k":11},13:{1W:"&2s;",2M:R,46:11,44:11,34:"4n",1x:{21:"4o 1m",2P:"?",1X:"1v\\n\\n",3E:"4r\'t 4t 1D O: ",4g:"4m 4B\'t 51 O 1z-1k 4F: ",37:\'<!4T 1z 4S "-//4V//3H 4W 1.0 4Z//4Y" "1Z://2y.3L.3K/4X/3I/3H/3I-4P.4J"><1z 4I="1Z://2y.3L.3K/4L/5L"><3J><4N 1Z-4M="5G-5M" 6K="2O/1z; 6J=6I-8" /><1t>6L 1v<\/1t><\/3J><3B 1L="25-6M:6Q,6P,6O,6N-6F;6y-2f:#6x;2f:#6w;25-22:6v;2O-3D:3C;"><T 1L="2O-3D:3C;3w-32:1.6z;"><T 1L="25-22:6A-6E;">1v<\/T><T 1L="25-22:.6C;3w-6B:6R;"><T>3v 3.0.76 (72 73 3x)<\/T><T><a 2h="1Z://3u.2w/1v" 1F="38" 1L="2f:#3y">1Z://3u.2w/1v<\/a><\/T><T>70 17 6U 71.<\/T><T>6T 6X-3x 6Y 6D.<\/T><\/T><T>6t 61 60 J 1k, 5Z <a 2h="6u://2y.62.2w/63-66/65?64=5X-5W&5P=5O" 1L="2f:#3y">5R<\/a> 5V <2R/>5U 5T 5S!<\/T><\/T><\/3B><\/1z>\'}},1Y:{2j:N,2A:{}},1U:{},3A:{6n:/\\/\\*[\\s\\S]*?\\*\\//2c,6m:/\\/\\/.*$/2c,6l:/#.*$/2c,6k:/"([^\\\\"\\n]|\\\\.)*"/g,6o:/\'([^\\\\\'\\n]|\\\\.)*\'/g,6p:1f M(\'"([^\\\\\\\\"]|\\\\\\\\.)*"\',"3z"),6s:1f M("\'([^\\\\\\\\\']|\\\\\\\\.)*\'","3z"),6q:/(&1y;|<)!--[\\s\\S]*?--(&1G;|>)/2c,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6a:{18:/(&1y;|<)\\?=?/g,1b:/\\?(&1G;|>)/g},69:{18:/(&1y;|<)%=?/g,1b:/%(&1G;|>)/g},6d:{18:/(&1y;|<)\\s*1k.*?(&1G;|>)/2T,1b:/(&1y;|<)\\/\\s*1k\\s*(&1G;|>)/2T}},16:{1H:6(a){6 b(i,k){H e.16.2o(i,k,e.13.1x[k])}O(K c=\'<T 1g="16">\',d=e.16.2x,h=d.2X,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+="<\/T>";H c},2o:6(a,b,c){H\'<2W><a 2h="#" 1g="6e 6h\'+b+" "+b+\'">\'+c+"<\/a><\/2W>"},2b:6(a){K b=a.1F,c=b.1l||"";b=B(p(b,".20",R).1c);K d=6(h){H(h=15(h+"6f(\\\\w+)").X(c))?h[1]:N}("6g");b&&d&&e.16.2x[d].2B(b);a.3N()},2x:{2X:["21","2P"],21:{1H:6(a){I(a.V("2l")!=R)H"";K b=a.V("1t");H e.16.2o(a,"21",b?b:e.13.1x.21)},2B:6(a){a=1E.6j(t(a.1c));a.1l=a.1l.Q("47","")}},2P:{2B:6(){K a="68=0";a+=", 18="+(31.30-33)/2+", 32="+(31.2Z-2Y)/2+", 30=33, 2Z=2Y";a=a.Q(/^,/,"");a=1P.6Z("","38",a);a.2C();K b=a.1E;b.6W(e.13.1x.37);b.6V();a.2C()}}}},35:6(a,b){K c;I(b)c=[b];Y{c=1E.36(e.13.34);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(e.13.2M)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3W 0,l={},m=1f M("^\\\\[(?<2V>(.*?))\\\\]$"),s=1f M("(?<27>[\\\\w-]+)\\\\s*:\\\\s*(?<1T>[\\\\w-%#]+|\\\\[.*?\\\\]|\\".*?\\"|\'.*?\')\\\\s*;?","g");(j=s.X(k))!=N;){K o=j.1T.Q(/^[\'"]|[\'"]$/g,"");I(o!=N&&m.1A(o)){o=m.X(o);o=o.2V.L>0?o.2V.1e(/\\s*,\\s*/):[]}l[j.27]=o}g={1F:g,1n:C(i,l)};g.1n.1D!=N&&d.U(g)}H d},1M:6(a,b){K c=J.35(a,b),d=N,h=e.13;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1F,k=b.1n,j=k.1D,l;I(j!=N){I(k["1z-1k"]=="R"||e.2v["1z-1k"]==R){d=1f e.4l(j);j="4O"}Y I(d=A(j))d=1f d;Y 6H;l=i.3X;I(h.2M){l=l;K m=x(l),s=11;I(m.1i("<![6G[")==0){m=m.4h(9);s=R}K o=m.L;I(m.1i("]]\\>")==o-3){m=m.4h(0,o-3);s=R}l=s?m:l}I((i.1t||"")!="")k.1t=i.1t;k.1D=j;d.2Q(k);b=d.2F(l);I((i.1c||"")!="")b.1c=i.1c;i.2G.74(b,i)}}},2E:6(a){w(1P,"4k",6(){e.1M(a)})}};e.2E=e.2E;e.1M=e.1M;e.2L=6(a,b,c){J.1T=a;J.P=b;J.L=a.L;J.23=c;J.1V=N};e.2L.Z.1q=6(){H J.1T};e.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1f e.1U.5Y,g=J,i="2F 1H 2Q".1e(" ");I(c!=N){d=1f c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1p(h,14)}})();d.28==N?1P.1X(e.13.1x.1X+(e.13.1x.4g+a)):h.2J.U({1I:d.28.17,2D:6(j){O(K l=j.17,m=[],s=d.2J,o=j.P+j.18.L,F=d.28,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.18!=N&&j.18!=N){q=y(j.18,F.18);b(q,j.P);m=m.1O(q)}I(F.1b!=N&&j.1b!=N){q=y(j.1b,F.1b);b(q,j.P+j[0].5Q(j.1b));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1V=c.1V;H m}})}};e.4j=6(){};e.4j.Z={V:6(a,b){K c=J.1n[a];c=c==N?b:c;K d={"R":R,"11":11}[c];H d==N?c:d},3Y:6(a){H 1E.4i(a)},4c:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1j a[d]=="2m")c=c.1O(y(b,a[d]));H J.4e(c.6b(D))},4e:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1N;Y I(g.P==c.P&&g.L>c.L)a[b]=N;Y I(g.P>=c.P&&g.P<d)a[h]=N}H a},4d:6(a){K b=[],c=2u(J.V("2i-1s"));v(a,6(d,h){b.U(h+c)});H b},3U:6(a){K b=J.V("1M",[]);I(1j b!="2m"&&b.U==N)b=[b];a:{a=a.1q();K c=3W 0;O(c=c=1Q.6c(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1N a}b=-1}H b!=-1},2r:6(a,b,c){a=["1s","6i"+b,"P"+a,"6r"+(b%2==0?1:2).1q()];J.3U(b)&&a.U("67");b==0&&a.U("1N");H\'<T 1g="\'+a.1K(" ")+\'">\'+c+"<\/T>"},3Q:6(a,b){K c="",d=a.1e("\\n").L,h=2u(J.V("2i-1s")),g=J.V("2z-1s-2t");I(g==R)g=(h+d-1).1q().L;Y I(3R(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=e.13.1W;Y{j=g;O(K l=k.1q();l.L<j;)l="0"+l;j=l}a=j;c+=J.2r(i,k,a)}H c},49:6(a,b){a=x(a);K c=a.1e("\\n");J.V("2z-1s-2t");K d=2u(J.V("2i-1s"));a="";O(K h=J.V("1D"),g=0;g<c.L;g++){K i=c[g],k=/^(&2s;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1q();i=i.1o(j.L);j=j.Q(" ",e.13.1W)}i=x(i);I(i.L==0)i=e.13.1W;a+=J.2r(g,l,(j!=N?\'<17 1g="\'+h+\' 5N">\'+j+"<\/17>":"")+i)}H a},4f:6(a){H a?"<4a>"+a+"<\/4a>":""},4b:6(a,b){6 c(l){H(l=l?l.1V||g:g)?l+" ":""}O(K d=0,h="",g=J.V("1D",""),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1o(d,k.P-d),j+"48")+u(k.1T,j+k.23);d=k.P+k.L+(k.75||0)}}h+=u(a.1o(d),c()+"48");H h},1H:6(a){K b="",c=["20"],d;I(J.V("2k")==R)J.1n.16=J.1n.1u=11;1l="20";J.V("2l")==R&&c.U("47");I((1u=J.V("1u"))==11)c.U("6S");c.U(J.V("1g-27"));c.U(J.V("1D"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,"").Q(/\\r/g," ");b=J.V("43-22");I(J.V("42-45")==R)a=n(a,b);Y{O(K h="",g=0;g<b;g++)h+=" ";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2R\\s*\\/?>|&1y;2R\\s*\\/?&1G;/2T;I(e.13.46==R)b=b.Q(h,"\\n");I(e.13.44==R)b=b.Q(h,"");b=b.1e("\\n");h=/^\\s*/;g=4Q;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1N a}g=1Q.4q(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1o(g);a=b.1K("\\n")}I(1u)d=J.4d(a);b=J.4c(J.2J,a);b=J.4b(a,b);b=J.49(b,d);I(J.V("41-40"))b=E(b);1j 2H!="1d"&&2H.3S&&2H.3S.1C(/5s/)&&c.U("5t");H b=\'<T 1c="\'+t(J.1c)+\'" 1g="\'+c.1K(" ")+\'">\'+(J.V("16")?e.16.1H(J):"")+\'<3Z 5z="0" 5H="0" 5J="0">\'+J.4f(J.V("1t"))+"<3T><3P>"+(1u?\'<2d 1g="1u">\'+J.3Q(a)+"<\/2d>":"")+\'<2d 1g="17"><T 1g="3O">\'+b+"<\/T><\/2d><\/3P><\/3T><\/3Z><\/T>"},2F:6(a){I(a===N)a="";J.17=a;K b=J.3Y("T");b.3X=J.1H(a);J.V("16")&&w(p(b,".16"),"5c",e.16.2b);J.V("3V-17")&&w(p(b,".17"),"56",f);H b},2Q:6(a){J.1c=""+1Q.5d(1Q.5n()*5k).1q();e.1Y.2A[t(J.1c)]=J;J.1n=C(e.2v,a||{});I(J.V("2k")==R)J.1n.16=J.1n.1u=11},5j:6(a){a=a.Q(/^\\s+|\\s+$/g,"").Q(/\\s+/g,"|");H"\\\\b(?:"+a+")\\\\b"},5f:6(a){J.28={18:{1I:a.18,23:"1k"},1b:{1I:a.1b,23:"1k"},17:1f M("(?<18>"+a.18.1m+")(?<17>.*?)(?<1b>"+a.1b.1m+")","5o")}}};H e}();1j 2e!="1d"&&(2e.1v=1v);', 62, 441, "||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|else|prototype||false|lastIndex|config|arguments|RegExp|toolbar|code|left|captureNames|slice|right|id|undefined|split|new|class|addToken|indexOf|typeof|script|className|source|params|substr|apply|toString|String|line|title|gutter|SyntaxHighlighter|_xregexp|strings|lt|html|test|OUTSIDE_CLASS|match|brush|document|target|gt|getHtml|regex|global|join|style|highlight|break|concat|window|Math|isRegExp|throw|value|brushes|brushName|space|log|vars|http|syntaxhighlighter|expandSource|size|css|case|font|Fa|name|htmlScript|dA|can|handler|gm|td|exports|color|in|href|first|discoveredBrushes|light|collapse|object|cache|getButtonHtml|trigger|pattern|getLineHtml|nbsp|numbers|parseInt|defaults|com|items|www|pad|highlighters|execute|focus|func|all|getDiv|parentNode|navigator|INSIDE_CLASS|regexList|hasFlag|Match|useScriptTags|hasNamedCapture|text|help|init|br|input|gi|Error|values|span|list|250|height|width|screen|top|500|tagName|findElements|getElementsByTagName|aboutDialog|_blank|appendChild|charAt|Array|copyAsGlobal|setFlag|highlighter_|string|attachEvent|nodeName|floor|backref|output|the|TypeError|sticky|Za|iterate|freezeTokens|scope|type|textarea|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|noBrush|require|childNodes|DTD|xhtml1|head|org|w3|url|preventDefault|container|tr|getLineNumbersHtml|isNaN|userAgent|tbody|isLineHighlighted|quick|void|innerHTML|create|table|links|auto|smart|tab|stripBrs|tabs|bloggerMode|collapsed|plain|getCodeLinesHtml|caption|getMatchesHtml|findMatches|figureOutLineNumbers|removeNestedMatches|getTitleHtml|brushNotHtmlScript|substring|createElement|Highlighter|load|HtmlScript|Brush|pre|expand|multiline|min|Can|ignoreCase|find|blur|extended|toLowerCase|aliases|addEventListener|innerText|textContent|wasn|select|createTextNode|removeChild|option|same|frame|xmlns|dtd|twice|1999|equiv|meta|htmlscript|transitional|1E3|expected|PUBLIC|DOCTYPE|on|W3C|XHTML|TR|EN|Transitional||configured|srcElement|Object|after|run|dblclick|matchChain|valueOf|constructor|default|switch|click|round|execAt|forHtmlScript|token|gimy|functions|getKeywords|1E6|escape|within|random|sgi|another|finally|supply|MSIE|ie|toUpperCase|catch|returnValue|definition|event|border|imsx|constructing|one|Infinity|from|when|Content|cellpadding|flags|cellspacing|try|xhtml|Type|spaces|2930402|hosted_button_id|lastIndexOf|donate|active|development|keep|to|xclick|_s|Xml|please|like|you|paypal|cgi|cmd|webscr|bin|highlighted|scrollbars|aspScriptTags|phpScriptTags|sort|max|scriptScriptTags|toolbar_item|_|command|command_|number|getElementById|doubleQuotedString|singleLinePerlComments|singleLineCComments|multiLineCComments|singleQuotedString|multiLineDoubleQuotedString|xmlComments|alt|multiLineSingleQuotedString|If|https|1em|000|fff|background|5em|xx|bottom|75em|Gorbatchev|large|serif|CDATA|continue|utf|charset|content|About|family|sans|Helvetica|Arial|Geneva|3em|nogutter|Copyright|syntax|close|write|2004|Alex|open|JavaScript|highlighter|July|02|replaceChild|offset|83".split("|"), 0, {}));
eval(function (n, t, i, r, u, f) {
    if (u = function (n) {
        return (n < t ? "" : u(parseInt(n / t))) + ((n = n % t) > 35 ? String.fromCharCode(n + 29) : n.toString(36))
    }
        ,
        !"".replace(/^/, String)) {
        while (i--)
            f[u(i)] = r[i] || u(i);
        r = [function (n) {
            return f[n]
        }
        ];
        u = function () {
            return "\\w+"
        }
            ;
        i = 1
    }
    while (i--)
        r[i] && (n = n.replace(new RegExp("\\b" + u(i) + "\\b", "g"), r[i]));
    return n
}('(2(){1 h=5;h.I=2(){2 n(c,a){4(1 d=0;d<c.9;d++)i[c[d]]=a}2 o(c){1 a=r.H("J"),d=3;a.K=c;a.M="L/t";a.G="t";a.u=a.v=2(){6(!d&&(!8.7||8.7=="F"||8.7=="z")){d=q;e[c]=q;a:{4(1 p y e)6(e[p]==3)B a;j&&5.C(k)}a.u=a.v=x;a.D.O(a)}};r.N.R(a)}1 f=Q,l=h.P(),i={},e={},j=3,k=x,b;5.T=2(c){k=c;j=q};4(b=0;b<f.9;b++){1 m=f[b].w?f[b]:f[b].S(/\\s+/),g=m.w();n(m,g)}4(b=0;b<l.9;b++)6(g=i[l[b].E.A]){e[g]=3;o(g)}}})();', 56, 56, "|var|function|false|for|SyntaxHighlighter|if|readyState|this|length|||||||||||||||||true|document||javascript|onload|onreadystatechange|pop|null|in|complete|brush|break|highlight|parentNode|params|loaded|language|createElement|autoloader|script|src|text|type|body|removeChild|findElements|arguments|appendChild|split|all".split("|"), 0, {}));
getMarkdownEditor = function (n) {
    var t = {};
    return t.textbox = document.getElementById(n),
        t.config = {
            enableAutoCompletion: !1
        },
        t.replaceSelectionWith = function (n) {
            var i = n.length - t.getSelection().length
                , r = t.textbox.selectionStart
                , u = t.textbox.selectionEnd + i;
            document.execCommand("insertText", !1, n) || t.textbox.setRangeText(n);
            t.textbox.selectionStart = r;
            t.textbox.selectionEnd = u;
            t.textbox.focus()
        }
        ,
        t.wrapSelectionWith = function (n, i, r) {
            var o = t.getSelection(), f, e, u;
            if (o.length === 0) {
                t.insertToCaret(n + i);
                return
            }
            if (r) {
                for (f = o.split("\n"),
                    e = "",
                    u = 0; u < f.length; u++)
                    f[u].length > 0 && (e += n + f[u] + i),
                        u !== f.length - 1 && (e += "\n");
                t.replaceSelectionWith(e)
            } else
                t.replaceSelectionWith(n + o + i);
            t.textbox.focus()
        }
        ,
        t.getCurrentLine = function () {
            var n = t.textbox.selectionStart
                , i = t.textbox.value.substring(0, n).lastIndexOf("\n");
            return t.textbox.value.substring(i + 1, n)
        }
        ,
        t.getStringRelativeToCaret = function (n) {
            var i, r;
            return n < 0 ? (i = t.textbox.selectionStart,
                t.textbox.value.substring(i + n, i)) : (r = t.textbox.selectionEnd,
                    t.textbox.value.substring(r, r + n))
        }
        ,
        t.insertToCaret = function (n) {
            if (!document.execCommand("insertText", !1, n)) {
                var i = t.textbox.selectionEnd;
                t.textbox.setRangeText(n, i, i, "end")
            }
        }
        ,
        t.moveCaretBy = function (n) {
            t.hasSelection() ? (t.textbox.selectionStart += n,
                t.textbox.selectionEnd += n) : n > 0 ? t.textbox.selectionStart += n : t.textbox.selectionEnd += n
        }
        ,
        t.getSelection = function () {
            var n = t.textbox.selectionStart
                , i = t.textbox.selectionEnd;
            return t.textbox.value.substring(n, i)
        }
        ,
        t.hasSelection = function () {
            return t.textbox.selectionEnd !== t.textbox.selectionStart
        }
        ,
        t.getDraftKey = function (n, t, i) {
            return n + "-draft-" + t + "-" + i
        }
        ,
        t.saveDraft = function (n, i, r) {
            t.textbox.value.length > 4e3 || window.localStorage.setItem(t.getDraftKey(n, i, r), t.textbox.value)
        }
        ,
        t.loadDraft = function (n, i, r) {
            var u = window.localStorage.getItem(t.getDraftKey(n, i, r));
            u && !t.textbox.value && (t.textbox.value = u)
        }
        ,
        t.removeDraft = function (n, i, r) {
            window.localStorage.removeItem(t.getDraftKey(n, i, r))
        }
        ,
        t.getConfigKey = function (n, t) {
            return n + "-config-" + t
        }
        ,
        t.saveConfig = function (n, i) {
            window.localStorage.setItem(t.getConfigKey(n, i), JSON.stringify(t.config))
        }
        ,
        t.loadConfig = function (n, i) {
            var r = window.localStorage.getItem(t.getConfigKey(n, i));
            r && (t.config = JSON.parse(r))
        }
        ,
        t.bracketMatchPairs = [{
            left: "(",
            right: ")"
        }, {
            left: "[",
            right: "]"
        }, {
            left: "{",
            right: "}"
        }, {
            left: "``",
            right: "`\n```",
            backspace: "``",
            moveBack: 4,
            trigger: "`",
            needLeftMatch: !0
        }, {
            left: "`",
            right: "`"
        }, {
            left: "*",
            right: "***",
            moveBack: 2,
            rollback: "*",
            trigger: "*",
            needLeftMatch: !0
        }, {
            left: '"',
            right: '"'
        }],
        t.bracketMatch = function (n) {
            for (var r = 0; r < t.bracketMatchPairs.length; r++) {
                var i = t.bracketMatchPairs[r]
                    , u = t.getStringRelativeToCaret(-i.left.length) === i.left
                    , f = t.getStringRelativeToCaret(i.right.length) === i.right;
                if (n === i.right && f)
                    return t.moveCaretBy(i.right.length),
                        !0;
                if (n === (i.trigger || i.left)) {
                    if (t.hasSelection()) {
                        if (!i.needLeftMatch)
                            return t.wrapSelectionWith(i.left, i.right),
                                !0;
                        continue
                    }
                    if (u && i.needLeftMatch)
                        return t.insertToCaret(i.right),
                            t.moveCaretBy(-(i.moveBack || i.right.length)),
                            !0;
                    if (!i.needLeftMatch)
                        return t.insertToCaret(i.left + i.right),
                            t.moveCaretBy(-(i.moveBack || i.right.length)),
                            !0
                }
            }
            return !1
        }
        ,
        t.bold = function () {
            t.wrapSelectionWith("**", "**", !0);
            t.hasSelection() || t.moveCaretBy(-2)
        }
        ,
        t.link = function () {
            t.wrapSelectionWith("[", "]()", !0);
            t.moveCaretBy(-1)
        }
        ,
        t.quote = function () {
            t.wrapSelectionWith("> ", "", !0)
        }
        ,
        t.code = function () {
            var i, r, n;
            if (!t.hasSelection()) {
                t.insertToCaret("``");
                t.moveCaretBy(-1);
                return
            }
            i = t.getSelection();
            r = i.lastIndexOf("\n");
            r > 0 ? (n = "```\n",
                r !== i.length - 1 && (n = "\n" + n),
                t.wrapSelectionWith("```\n", n, !1)) : t.wrapSelectionWith("`", "`", !1)
        }
        ,
        t.increaseIndent = function () {
            t.hasSelection() ? t.wrapSelectionWith("  ", "", !0) : t.insertToCaret("  ")
        }
        ,
        t.decreaseIndent = function () {
            for (var u, i = t.getSelection().split("\n"), r = "", n = 0; n < i.length; n++)
                u = i[n].substring(0, 2).lastIndexOf(" ") + 1,
                    i[n] = i[n].substring(u),
                    r += i[n],
                    n !== i.length - 1 && (r += "\n");
            t.replaceSelectionWith(r)
        }
        ,
        t.hotKeyMap = [{
            key: "ctrl+`",
            action: t.code
        }, {
            key: "ctrl+b",
            action: t.bold
        }, {
            key: "ctrl+q",
            action: t.quote
        }, {
            key: "ctrl+k",
            action: t.link
        }, {
            key: "shift+tab",
            action: t.decreaseIndent
        }, {
            key: "tab",
            action: t.increaseIndent
        }],
        t.onKeydown = function (n) {
            var r, f, u, i, e, o, s;
            if (n.isComposing || n.keyCode === 229)
                return !0;
            for (r = 0; r < t.hotKeyMap.length; r++) {
                for (f = !0,
                    u = t.hotKeyMap[r].key.split("+"),
                    i = 0; i < u.length; i++)
                    f &= u[i].toLowerCase() === "ctrl".toLowerCase() ? n.ctrlKey || n.metaKey : u[i].toLowerCase() === "shift".toLowerCase() ? n.shiftKey : n.key.toLowerCase() === u[i].toLowerCase();
                if (f)
                    return t.hotKeyMap[r].action(),
                        !1
            }
            if (!t.config.enableAutoCompletion)
                return !0;
            if (t.bracketMatch(n.key))
                return !1;
            if (n.key === "Enter") {
                if (e = t.getCurrentLine(),
                    e.substring(0, 2) === "* ")
                    return t.insertToCaret("\n* "),
                        !1;
                if (o = e.match(/(\d+)\. [^\n]*/),
                    o)
                    return s = parseInt(o[1]) + 1,
                        t.insertToCaret("\n" + s + ". "),
                        !1
            }
            return !0
        }
        ,
        t
}
    ;
initCommentEditor = function (n) {
    var t = {};
    t.currentEditor = getMarkdownEditor(n);
    t.currentUserId = $("#span_current_user_id").html();
    t.quote = function () {
        t.currentEditor.quote()
    }
        ;
    t.bold = function () {
        t.currentEditor.bold()
    }
        ;
    t.link = function () {
        t.currentEditor.link()
    }
        ;
    t.image = function () {
        var n = location.protocol + "//upload.cnblogs" + location.hostname.substring(location.hostname.lastIndexOf(".")) + "/imageuploader/upload?host=www.cnblogs.com&editor=4#tbCommentBody";
        document.domain = "cnblogs." + location.hostname.substring(location.hostname.lastIndexOf(".") + 1, location.hostname.length);
        OpenWindow(n, 450, 120, 200)
    }
        ;
    t.currentEditor.hotKeyMap.push({
        key: "ctrl+i",
        action: t.image
    });
    t.code = function () {
        t.currentEditor.code()
    }
        ;
    t.preview = function () {
        var n, i, r;
        $("#btn_preview_comment").addClass("active").prop("onclick", null).off("click");
        $("#btn_edit_comment").removeClass("active").on("click", function () {
            return t.unPreview()
        });
        if ($(".commentbox_title_right").hide(),
            $(".commentbox_footer").hide(),
            n = $.trim($("#tbCommentBody").val()),
            $("#tbCommentBody").hide(),
            $("#tbCommentBodyPreview").show(),
            $("#tbCommentBodyPreviewBody").html("正在加载预览……"),
            n.length > 4e3) {
            $("#tbCommentBodyPreviewBody").html("评论内容过长，超过4000个字数限制！当前长度：" + n.length);
            return
        }
        if (n.trim().length === 0) {
            $("#tbCommentBodyPreviewBody").html("");
            return
        }
        if (cb_entryId <= 0) {
            $("#tbCommentBodyPreviewBody").html("postId不正确");
            return
        }
        $("#btn_comment_submit").attr("disabled", "disabled");
        i = {};
        i.postId = cb_entryId;
        i.body = n;
        r = $("#span_parentcomment_id").text();
        i.parentCommentId = /(\d)/.test(r) ? parseInt(r, 10) : 0;
        $.ajax({
            url: getAjaxBaseUrl() + "PostComment/Preview.aspx",
            data: JSON.stringify(i),
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            timeout: 5e3,
            success: function (n) {
                if (n)
                    $("#tbCommentBodyPreviewBody").html(n.message),
                        markdown_highlight("#tbCommentBodyPreviewBody"),
                        $("#btn_comment_submit").removeAttr("disabled");
                else
                    $("#tbCommentBodyPreviewBody").html("抱歉！预览加载失败！请与管理员联系(contact@cnblogs.com)。"),
                        $("#btn_comment_submit").removeAttr("disabled")
            },
            error: function (n, t) {
                n.status === 500 ? $("#tbCommentBodyPreviewBody").html("抱歉！发生了错误！麻烦反馈至contact@cnblogs.com") : n.status > 0 ? $("#tbCommentBodyPreviewBody").html("抱歉！预览加载失败！错误码：" + n.status + " 错误信息：" + n.responseText) : $("#tbCommentBodyPreviewBody").html("抱歉！预览加载失败！xhr.status: " + n.status + ", textStatus: " + t);
                $("#btn_comment_submit").removeAttr("disabled")
            }
        });
        t.saveComment()
    }
        ;
    t.unPreview = function () {
        $("#btn_preview_comment").removeClass("active").on("click", function () {
            return t.preview()
        });
        $("#btn_edit_comment").addClass("active").prop("onclick", null).off("click");
        $(".commentbox_title_right").show();
        $(".commentbox_footer").show();
        $("#tbCommentBodyPreview").hide();
        $("#tbCommentBody").show();
        t.saveComment()
    }
        ;
    t.onKeydown = function (n) {
        return t.currentEditor.onKeydown(n)
    }
        ;
    t.setAutoCompletion = function (n) {
        t.currentEditor.config.enableAutoCompletion = n;
        t.currentEditor.saveConfig("comment", t.currentUserId);
        t.updateAutoCompletionStatus()
    }
        ;
    t.updateAutoCompletionStatus = function () {
        if (t.currentEditor.config.enableAutoCompletion) {
            $("#comment_auto_completion_on").show();
            $("#comment_auto_completion_off").hide();
            return
        }
        $("#comment_auto_completion_on").hide();
        $("#comment_auto_completion_off").show()
    }
        ;
    t.saveComment = function () {
        t.currentEditor.saveDraft("comment", t.currentUserId, cb_entryId)
    }
        ;
    t.loadComment = function () {
        t.currentEditor.loadDraft("comment", t.currentUserId, cb_entryId)
    }
        ;
    t.removeComment = function () {
        t.currentEditor.removeDraft("comment", t.currentUserId, cb_entryId)
    }
        ;
    t.updateControls = function () {
        t.updateAutoCompletionStatus()
    }
        ;
    t.loadComment();
    t.currentEditor.loadConfig("comment", t.currentUserId);
    t.updateControls();
    setInterval(t.saveComment, 1e4);
    $(window).on("unload", t.saveComment);
    $("#" + n).on("keydown", function (n) {
        return t.onKeydown(n)
    });
    $("#btn_preview_comment").on("click", function () {
        return t.preview()
    });
    $("#btn_edit_comment").on("click", function () {
        return t.unPreview()
    });
    $("#ubb_quote").on("click", function () {
        t.quote();
        t.currentEditor.textbox.focus()
    });
    $("#ubb_bold").on("click", function () {
        t.bold();
        t.currentEditor.textbox.focus()
    });
    $("#ubb_url").on("click", function () {
        t.link();
        t.currentEditor.textbox.focus()
    });
    $("#ubb_code").on("click", function () {
        t.code();
        t.currentEditor.textbox.focus()
    });
    $("#ubb_img").on("click", function () {
        t.image();
        t.currentEditor.textbox.focus()
    });
    $("#ubb_auto_completion").on("click", function () {
        t.setAutoCompletion(!t.currentEditor.config.enableAutoCompletion)
    });
    return t
}
    ;
$.fn.extend({
    selection: function () {
        var n = "", u = this.get(0).document, t, i, r;
        return u ? (t = u.selection.createRange(),
            t.text.length > 0 && (n = t.text)) : (this.get(0).selectionStart || this.get(0).selectionStart == "0") && (i = this.get(0).selectionStart,
                r = this.get(0).selectionEnd,
                i != r && (n = this.get(0).value.substring(i, r))),
            $.trim(n)
    },
    parseHtml: function (n) {
        var t = this.get(0).document;
        if (t)
            this.get(0).focus(),
                t.selection.createRange().collapse,
                this.get(0).document.selection.createRange().text = n;
        else if (this.get(0).selectionStart || this.get(0).selectionStart == "0") {
            var r = this.get(0).selectionStart
                , u = this.get(0).selectionEnd
                , i = this.get(0).value
                , f = i.substring(0, r)
                , e = i.substring(u);
            this.get(0).value = f + n + e
        }
    }
});
insertUBB = function (n, t) {
    var i = $("#" + n).selection(), r;
    t != "quote" || i || (window.getSelection ? i = window.getSelection().toString() : document.getSelection ? i = document.getSelection().toString() : document.selection && (i = document.selection.createRange().text),
        $("#" + n).focus());
    i ? (r = t,
        t.indexOf("=") >= 0 && (r = t.substring(0, t.indexOf("="))),
        $("#" + n).parseHtml("[" + t + "]" + i + "[/" + r + "]")) : $("#tip_comment").html("请选择文字")
}
    ;
$(function () {
    var n = $("#cnblogs_post_body div.cnblogs_code")
        , i = /^\s*1/gi
        , t = /<br\s*\/?>/gi;
    n.length && (loadEncoderJs(),
        $.each(n, function () {
            if (i.test($(this).text())) {
                var n = $(this).html();
                navigator.userAgent.search("MSIE") >= 0 && n.indexOf("<pre>") > -1 && t.test(n) && (n = n.replace(t, "\r\n"),
                    $(this).html(n))
            }
            showCopyCode(this)
        }));
    bindCodeCollapseImages()
});
var initSideColumnManager = function () {
    var n = {};
    return n.loadMore = function (t) {
        $(t).text("收起").removeAttr("onclick").off("click").on("click", function () {
            n.showLess(t)
        });
        $(t).parent().parent().find("*[data-category-list-item-visible=false]").show()
    }
        ,
        n.showLess = function (t) {
            $(t).text("更多").removeAttr("onclick").off("click").on("click", function () {
                n.loadMore(t)
            });
            $(t).parent().parent().find("*[data-category-list-item-visible=false]").hide()
        }
        ,
        n
}
    , sideColumnManager = initSideColumnManager()
    , initBlogSubscribeManager = function (n) {
        var t = {};
        return t.rssTag = function () {
            var t = $("#" + n).data("rss");
            return '<a href="' + t + '" target="_blank">Rss<\/a>'
        }
            ,
            t.dialogs = {
                loginRequest: function () {
                    return dialog({
                        id: "dialog-blog-login",
                        title: "博客订阅",
                        content: "您尚未登录，请先登录/注册",
                        button: [{
                            value: "注册",
                            callback: function () {
                                account.register()
                            }
                        }, {
                            value: "登录",
                            callback: function () {
                                account.login()
                            },
                            autofocus: !0
                        }],
                        statusbar: t.rssTag()
                    })
                },
                subscribe: function () {
                    return dialog({
                        id: "dialog-blog-subscribe",
                        title: "博客订阅",
                        content: "订阅博客后，您可以在博客园首页查看该博客的更新动态。",
                        okValue: "订阅",
                        ok: function () {
                            var n = t.dialogs.loading();
                            n.show();
                            $.ajax({
                                url: getAjaxBaseUrl() + "blogSubscription",
                                type: "POST",
                                dataType: "JSON",
                                success: function (i) {
                                    n.close().remove();
                                    i ? i.success ? (t.dialogs.success("订阅成功！<a href='/subscription'>查看订阅<\/a>").show(),
                                        t.updateSubscribeStatus(!0)) : t.dialogs.error("订阅失败！").show() : t.dialogs.error("订阅失败！").show()
                                },
                                error: function (i) {
                                    n.close().remove();
                                    t.dialogs.error("抱歉！订阅失败，错误码：" + i.status)
                                }
                            })
                        },
                        cancel: function () { },
                        cancelValue: "取消",
                        statusbar: t.rssTag()
                    })
                },
                unsubscribe: function () {
                    return dialog({
                        id: "dialog-blog-unsubscribe",
                        title: "取消订阅",
                        content: "取消订阅后，您将无法看到该博客的更新动态。",
                        okValue: "取消订阅",
                        ok: function () {
                            var n = t.dialogs.loading();
                            n.show();
                            $.ajax({
                                url: getAjaxBaseUrl() + "blogSubscription",
                                type: "DELETE",
                                success: function (i) {
                                    n.close().remove();
                                    i ? i.success ? (t.dialogs.success("取消订阅成功！").show(),
                                        t.updateSubscribeStatus(!1)) : t.dialogs.error(i.message).show() : t.dialogs.error("取消订阅失败！").show()
                                },
                                error: function (i) {
                                    n.close().remove();
                                    t.dialogs.error("抱歉！取消订阅失败，错误码：" + i.status).show()
                                }
                            })
                        },
                        cancel: function () { },
                        cancelValue: "点错了",
                        statusbar: t.rssTag()
                    })
                },
                error: function (n) {
                    return dialog({
                        content: n,
                        cancelValue: "关闭",
                        cancel: function () { },
                        quickClose: !0,
                        statusbar: t.rssTag()
                    })
                },
                success: function (n) {
                    return dialog({
                        content: n,
                        ok: function () { },
                        okValue: "确定",
                        quickClose: !0
                    })
                },
                loading: function () {
                    return dialog({
                        calcel: !1
                    })
                }
            },
            t.subscribe = function () {
                var n = t.dialogs.subscribe();
                n.show()
            }
            ,
            t.unsubscribe = function () {
                var n = t.dialogs.unsubscribe();
                n.show()
            }
            ,
            t.login = function () {
                var n = t.dialogs.loginRequest();
                n.show()
            }
            ,
            t.updateSubscribeStatus = function (n) {
                $("#blog_nav_rss").text().trim().indexOf("订阅") >= 0 ? n ? $("#blog_nav_rss").html("已订阅") : $("#blog_nav_rss").html("订阅") : n ? $("#blog_nav_rss").html("UnSubscribe") : $("#blog_nav_rss").html("Subscribe")
            }
            ,
            $(function () {
                isLogined && $.ajax({
                    url: getAjaxBaseUrl() + "blogSubscription",
                    type: "GET",
                    dataType: "json",
                    success: function (n) {
                        t.updateSubscribeStatus(n.isSubscribed)
                    }
                });
                $("#" + n).on("click", function () {
                    loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", function () {
                        loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-plus-min.js", function () {
                            var n = dialog({}).show();
                            return $.ajax({
                                url: getAjaxBaseUrl() + "blogSubscription",
                                type: "GET",
                                dataType: "json",
                                success: function (i) {
                                    i ? (n.close(),
                                        i.isAuthenticated ? i.isBlogOwner ? t.dialogs.error("园友可以通过此链接订阅您的博客").show() : i.isSubscribed ? t.unsubscribe() : t.subscribe() : t.login()) : t.dialogs.error("发生错误！").show()
                                },
                                error: function (n) {
                                    t.dialogs.error("发生错误，错误码：" + n.status).show()
                                }
                            }),
                                !0
                        })
                    })
                })
            }),
            t
    };
initBlogSubscribeManager("blog_nav_rss");
tagOrderer = function (n, t, i, r) {
    var u = {};
    return u.manager = r,
        u.label = document.getElementById(n),
        u.name = document.getElementById(n).innerText,
        u.isActive = i,
        u.isDesc = !1,
        u.orderMethod = t,
        u.click = function () {
            r.orderers.forEach(function (n) {
                n.isActive = !1
            });
            u.isActive = !0;
            u.isDesc = !u.isDesc;
            u.showStatus();
            r.sortTag(function (n, i) {
                return u.isDesc ? t(i, n) : t(n, i)
            });
            r.orderers.forEach(function (n) {
                n.showStatus()
            })
        }
        ,
        u.showStatus = function () {
            u.label.innerText = u.name + (u.isActive ? u.isDesc ? "⬇" : "⬆" : "")
        }
        ,
        u.label.addEventListener("click", u.click),
        u
}
    ;
initTagsManager = function () {
    var n = {};
    return n.tags = $("#MyTag1_dtTagList td").get(),
        n.generateTagList = function () {
            for (var r, t, u, f = Math.ceil(n.tags.length / 4), e = document.createElement("tbody"), i = 0; i < f; i++) {
                for (r = document.createElement("tr"),
                    t = 0; t < 4; t++)
                    u = i + t * f,
                        u < n.tags.length && r.appendChild(n.tags[u]);
                e.appendChild(r)
            }
            $("#MyTag1_dtTagList").html(e)
        }
        ,
        n.sortTag = function (t) {
            n.tags = n.tags.sort(t);
            n.generateTagList()
        }
        ,
        n.orderers = [tagOrderer("tags_orderby_usecount", function (n, t) {
            var r = $(n).children(".small").text().slice(1, -1)
                , u = $(t).children(".small").text().slice(1, -1)
                , i = r - u;
            return i === 0 ? n.innerText.localeCompare(t.innerText) : i
        }, !0, n), tagOrderer("tags_orderby_name", function (n, t) {
            return n.innerText.localeCompare(t.innerText)
        }, !1, n)],
        n.deactiveAll = function () {
            n.orderers.forEach(function (n) {
                n.isActive = !1
            })
        }
        ,
        n.orderers[0].click(),
        n
}
    ;
$.ajaxSetup({
    type: "post",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    cache: !0
});
var isSyntaxHighlighted = !1
    , c_has_follwed = !1
    , comment_maxId = 0
    , comment_maxDate = "";
window.alert = function (n) {
    try {
        console.log("alert: " + n)
    } catch (t) { }
    return !0
}
    ;
document.open = function () { }
    ;
buildVoteNode = function (n, t) {
    var i = {};
    return i.digg = $(t).children(".comment_digg").get(0),
        i.bury = $(t).children(".comment_burry").get(0),
        i.errorMessage = $(t).children(".comment_error").get(0),
        i.current = n === "Digg" ? i.digg : i.bury,
        i.getCommentVoteCount = function (n) {
            return parseInt($(n).html().match(/\d+/g))
        }
        ,
        i.increaseCommentVoteCount = function (n) {
            $(n).html($(n).html().replace(/\d+/g, function (n) {
                return parseInt(n) + 1
            }))
        }
        ,
        i.decreaseCommentVoteCount = function (n) {
            $(n).html($(n).html().replace(/\d+/g, function (n) {
                return parseInt(n) - 1
            }))
        }
        ,
        i.showErrorMessage = function (n) {
            $(i.errorMessage).html(n)
        }
        ,
        i.clearErrorMessage = function () {
            $(i.errorMessage).html("")
        }
        ,
        i
}
    ;
$(function () {
    enableGoogleAnalytics() && google_ga()
});
/*! For license information please see common-webpack.min.js.LICENSE.txt */
!function () {
    function n(r) {
        if (t[r])
            return t[r].exports;
        var u = t[r] = {
            exports: {}
        };
        return i[r].call(u.exports, u, u.exports, n),
            u.exports
    }
    var i = {
        6163: function (n) {
            n.exports = function (n) {
                if ("function" != typeof n)
                    throw TypeError(String(n) + " is not a function");
                return n
            }
        },
        2569: function (n, t, i) {
            var r = i(794);
            n.exports = function (n) {
                if (!r(n))
                    throw TypeError(String(n) + " is not an object");
                return n
            }
        },
        5766: function (n, t, i) {
            var u = i(2977)
                , f = i(97)
                , e = i(6782)
                , r = function (n) {
                    return function (t, i, r) {
                        var c, s = u(t), h = f(s.length), o = e(r, h);
                        if (n && i != i) {
                            for (; h > o;)
                                if ((c = s[o++]) != c)
                                    return !0
                        } else
                            for (; h > o; o++)
                                if ((n || o in s) && s[o] === i)
                                    return n || o || 0;
                        return !n && -1
                    }
                };
            n.exports = {
                includes: r(!0),
                indexOf: r(!1)
            }
        },
        4805: function (n, t, i) {
            var f = i(2938)
                , e = i(5044)
                , o = i(1324)
                , s = i(97)
                , h = i(4822)
                , u = [].push
                , r = function (n) {
                    var t = 1 == n
                        , c = 2 == n
                        , l = 3 == n
                        , i = 4 == n
                        , r = 6 == n
                        , a = 7 == n
                        , v = 5 == n || r;
                    return function (y, p, w, b) {
                        for (var d, nt, it = o(y), tt = e(it), ft = f(p, w, 3), rt = s(tt.length), k = 0, ut = b || h, g = t ? ut(y, rt) : c || a ? ut(y, 0) : void 0; rt > k; k++)
                            if ((v || k in tt) && (nt = ft(d = tt[k], k, it),
                                n))
                                if (t)
                                    g[k] = nt;
                                else if (nt)
                                    switch (n) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return d;
                                        case 6:
                                            return k;
                                        case 2:
                                            u.call(g, d)
                                    }
                                else
                                    switch (n) {
                                        case 4:
                                            return !1;
                                        case 7:
                                            u.call(g, d)
                                    }
                        return r ? -1 : l || i ? i : g
                    }
                };
            n.exports = {
                forEach: r(0),
                map: r(1),
                filter: r(2),
                some: r(3),
                every: r(4),
                find: r(5),
                findIndex: r(6),
                filterOut: r(7)
            }
        },
        9269: function (n, t, i) {
            var r = i(6544)
                , u = i(3649)
                , f = i(4061)
                , e = u("species");
            n.exports = function (n) {
                return f >= 51 || !r(function () {
                    var t = [];
                    return (t.constructor = {})[e] = function () {
                        return {
                            foo: 1
                        }
                    }
                        ,
                        1 !== t[n](Boolean).foo
                })
            }
        },
        4822: function (n, t, i) {
            var u = i(794)
                , r = i(4521)
                , f = i(3649)("species");
            n.exports = function (n, t) {
                var i;
                return r(n) && ("function" != typeof (i = n.constructor) || i !== Array && !r(i.prototype) ? u(i) && null === (i = i[f]) && (i = void 0) : i = void 0),
                    new (void 0 === i ? Array : i)(0 === t ? 0 : t)
            }
        },
        9624: function (n) {
            var t = {}.toString;
            n.exports = function (n) {
                return t.call(n).slice(8, -1)
            }
        },
        3478: function (n, t, i) {
            var r = i(4402)
                , u = i(929)
                , f = i(6683)
                , e = i(4615);
            n.exports = function (n, t) {
                for (var i, s = u(t), h = e.f, c = f.f, o = 0; o < s.length; o++)
                    i = s[o],
                        r(n, i) || h(n, i, c(t, i))
            }
        },
        57: function (n, t, i) {
            var r = i(8494)
                , u = i(4615)
                , f = i(4677);
            n.exports = r ? function (n, t, i) {
                return u.f(n, t, f(1, i))
            }
                : function (n, t, i) {
                    return n[t] = i,
                        n
                }
        },
        4677: function (n) {
            n.exports = function (n, t) {
                return {
                    enumerable: !(1 & n),
                    configurable: !(2 & n),
                    writable: !(4 & n),
                    value: t
                }
            }
        },
        8494: function (n, t, i) {
            var r = i(6544);
            n.exports = !r(function () {
                return 7 != Object.defineProperty({}, 1, {
                    get: function () {
                        return 7
                    }
                })[1]
            })
        },
        6668: function (n, t, i) {
            var f = i(7583)
                , u = i(794)
                , r = f.document
                , e = u(r) && u(r.createElement);
            n.exports = function (n) {
                return e ? r.createElement(n) : {}
            }
        },
        5354: function (n, t, i) {
            var r = i(9624)
                , u = i(7583);
            n.exports = "process" == r(u.process)
        },
        6918: function (n, t, i) {
            var r = i(5897);
            n.exports = r("navigator", "userAgent") || ""
        },
        4061: function (n, t, i) {
            var r, u, h = i(7583), f = i(6918), e = h.process, o = e && e.versions, s = o && o.v8;
            s ? u = (r = s.split("."))[0] + r[1] : f && (!(r = f.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = f.match(/Chrome\/(\d+)/)) && (u = r[1]);
            n.exports = u && +u
        },
        5690: function (n) {
            n.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
        },
        7263: function (n, t, i) {
            var r = i(7583)
                , u = i(6683).f
                , f = i(57)
                , e = i(1270)
                , o = i(460)
                , s = i(3478)
                , h = i(4451);
            n.exports = function (n, t) {
                var a, i, c, l, y, v = n.target, p = n.global, w = n.stat;
                if (a = p ? r : w ? r[v] || o(v, {}) : (r[v] || {}).prototype)
                    for (i in t) {
                        if (l = t[i],
                            c = n.noTargetGet ? (y = u(a, i)) && y.value : a[i],
                            !h(p ? i : v + (w ? "." : "#") + i, n.forced) && void 0 !== c) {
                            if (typeof l == typeof c)
                                continue;
                            s(l, c)
                        }
                        (n.sham || c && c.sham) && f(l, "sham", !0);
                        e(a, i, l, n)
                    }
            }
        },
        6544: function (n) {
            n.exports = function (n) {
                try {
                    return !!n()
                } catch (n) {
                    return !0
                }
            }
        },
        2938: function (n, t, i) {
            var r = i(6163);
            n.exports = function (n, t, i) {
                if (r(n),
                    void 0 === t)
                    return n;
                switch (i) {
                    case 0:
                        return function () {
                            return n.call(t)
                        }
                            ;
                    case 1:
                        return function (i) {
                            return n.call(t, i)
                        }
                            ;
                    case 2:
                        return function (i, r) {
                            return n.call(t, i, r)
                        }
                            ;
                    case 3:
                        return function (i, r, u) {
                            return n.call(t, i, r, u)
                        }
                }
                return function () {
                    return n.apply(t, arguments)
                }
            }
        },
        5897: function (n, t, i) {
            var r = i(1287)
                , u = i(7583)
                , f = function (n) {
                    if ("function" == typeof n)
                        return n
                };
            n.exports = function (n, t) {
                return arguments.length < 2 ? f(r[n]) || f(u[n]) : r[n] && r[n][t] || u[n] && u[n][t]
            }
        },
        7583: function (n, t, i) {
            var r = function (n) {
                return n && n.Math == Math && n
            };
            n.exports = r("object" == typeof globalThis && globalThis) || r("object" == typeof window && window) || r("object" == typeof self && self) || r("object" == typeof i.g && i.g) || function () {
                return this
            }() || Function("return this")()
        },
        4402: function (n) {
            var t = {}.hasOwnProperty;
            n.exports = function (n, i) {
                return t.call(n, i)
            }
        },
        4639: function (n) {
            n.exports = {}
        },
        275: function (n, t, i) {
            var r = i(8494)
                , u = i(6544)
                , f = i(6668);
            n.exports = !r && !u(function () {
                return 7 != Object.defineProperty(f("div"), "a", {
                    get: function () {
                        return 7
                    }
                }).a
            })
        },
        5044: function (n, t, i) {
            var r = i(6544)
                , u = i(9624)
                , f = "".split;
            n.exports = r(function () {
                return !Object("z").propertyIsEnumerable(0)
            }) ? function (n) {
                return "String" == u(n) ? f.call(n, "") : Object(n)
            }
                : Object
        },
        9734: function (n, t, i) {
            var r = i(1314)
                , u = Function.toString;
            "function" != typeof r.inspectSource && (r.inspectSource = function (n) {
                return u.call(n)
            }
            );
            n.exports = r.inspectSource
        },
        2743: function (n, t, i) {
            var e, f, o, c = i(9491), l = i(7583), a = i(794), v = i(57), s = i(4402), h = i(1314), y = i(9137), p = i(4639), w = l.WeakMap, u;
            if (c) {
                var r = h.state || (h.state = new w)
                    , b = r.get
                    , k = r.has
                    , d = r.set;
                e = function (n, t) {
                    return t.facade = n,
                        d.call(r, n, t),
                        t
                }
                    ;
                f = function (n) {
                    return b.call(r, n) || {}
                }
                    ;
                o = function (n) {
                    return k.call(r, n)
                }
            } else
                u = y("state"),
                    p[u] = !0,
                    e = function (n, t) {
                        return t.facade = n,
                            v(n, u, t),
                            t
                    }
                    ,
                    f = function (n) {
                        return s(n, u) ? n[u] : {}
                    }
                    ,
                    o = function (n) {
                        return s(n, u)
                    }
                    ;
            n.exports = {
                set: e,
                get: f,
                has: o,
                enforce: function (n) {
                    return o(n) ? f(n) : e(n, {})
                },
                getterFor: function (n) {
                    return function (t) {
                        var i;
                        if (!a(t) || (i = f(t)).type !== n)
                            throw TypeError("Incompatible receiver, " + n + " required");
                        return i
                    }
                }
            }
        },
        4521: function (n, t, i) {
            var r = i(9624);
            n.exports = Array.isArray || function (n) {
                return "Array" == r(n)
            }
        },
        4451: function (n, t, i) {
            var u = i(6544)
                , f = /#|\.prototype\./
                , r = function (n, t) {
                    var i = o[e(n)];
                    return i == h || i != s && ("function" == typeof t ? u(t) : !!t)
                }
                , e = r.normalize = function (n) {
                    return String(n).replace(f, ".").toLowerCase()
                }
                , o = r.data = {}
                , s = r.NATIVE = "N"
                , h = r.POLYFILL = "P";
            n.exports = r
        },
        794: function (n) {
            n.exports = function (n) {
                return "object" == typeof n ? null !== n : "function" == typeof n
            }
        },
        6268: function (n) {
            n.exports = !1
        },
        8640: function (n, t, i) {
            var u = i(5354)
                , r = i(4061)
                , f = i(6544);
            n.exports = !!Object.getOwnPropertySymbols && !f(function () {
                return !Symbol.sham && (u ? 38 === r : r > 37 && r < 41)
            })
        },
        9491: function (n, t, i) {
            var u = i(7583)
                , f = i(9734)
                , r = u.WeakMap;
            n.exports = "function" == typeof r && /native code/.test(f(r))
        },
        4615: function (n, t, i) {
            var f = i(8494)
                , e = i(275)
                , r = i(2569)
                , o = i(2670)
                , u = Object.defineProperty;
            t.f = f ? u : function (n, t, i) {
                if (r(n),
                    t = o(t, !0),
                    r(i),
                    e)
                    try {
                        return u(n, t, i)
                    } catch (n) { }
                if ("get" in i || "set" in i)
                    throw TypeError("Accessors not supported");
                return "value" in i && (n[t] = i.value),
                    n
            }
        },
        6683: function (n, t, i) {
            var u = i(8494)
                , f = i(112)
                , e = i(4677)
                , o = i(2977)
                , s = i(2670)
                , h = i(4402)
                , c = i(275)
                , r = Object.getOwnPropertyDescriptor;
            t.f = u ? r : function (n, t) {
                if (n = o(n),
                    t = s(t, !0),
                    c)
                    try {
                        return r(n, t)
                    } catch (n) { }
                if (h(n, t))
                    return e(!f.f.call(n, t), n[t])
            }
        },
        9275: function (n, t, i) {
            var r = i(8356)
                , u = i(5690).concat("length", "prototype");
            t.f = Object.getOwnPropertyNames || function (n) {
                return r(n, u)
            }
        },
        4012: function (n, t) {
            t.f = Object.getOwnPropertySymbols
        },
        8356: function (n, t, i) {
            var r = i(4402)
                , u = i(2977)
                , f = i(5766).indexOf
                , e = i(4639);
            n.exports = function (n, t) {
                var i, s = u(n), h = 0, o = [];
                for (i in s)
                    !r(e, i) && r(s, i) && o.push(i);
                for (; t.length > h;)
                    r(s, i = t[h++]) && (~f(o, i) || o.push(i));
                return o
            }
        },
        112: function (n, t) {
            "use strict";
            var i = {}.propertyIsEnumerable
                , r = Object.getOwnPropertyDescriptor
                , u = r && !i.call({
                    1: 2
                }, 1);
            t.f = u ? function (n) {
                var t = r(this, n);
                return !!t && t.enumerable
            }
                : i
        },
        929: function (n, t, i) {
            var r = i(5897)
                , u = i(9275)
                , f = i(4012)
                , e = i(2569);
            n.exports = r("Reflect", "ownKeys") || function (n) {
                var t = u.f(e(n))
                    , i = f.f;
                return i ? t.concat(i(n)) : t
            }
        },
        1287: function (n, t, i) {
            var r = i(7583);
            n.exports = r
        },
        1270: function (n, t, i) {
            var f = i(7583)
                , r = i(57)
                , e = i(4402)
                , o = i(460)
                , s = i(9734)
                , u = i(2743)
                , h = u.get
                , c = u.enforce
                , l = String(String).split("String");
            (n.exports = function (n, t, i, u) {
                var h, a = !!u && !!u.unsafe, s = !!u && !!u.enumerable, v = !!u && !!u.noTargetGet;
                "function" == typeof i && ("string" != typeof t || e(i, "name") || r(i, "name", t),
                    (h = c(i)).source || (h.source = l.join("string" == typeof t ? t : "")));
                n !== f ? (a ? !v && n[t] && (s = !0) : delete n[t],
                    s ? n[t] = i : r(n, t, i)) : s ? n[t] = i : o(t, i)
            }
            )(Function.prototype, "toString", function () {
                return "function" == typeof this && h(this).source || s(this)
            })
        },
        3955: function (n) {
            n.exports = function (n) {
                if (null == n)
                    throw TypeError("Can't call method on " + n);
                return n
            }
        },
        460: function (n, t, i) {
            var r = i(7583)
                , u = i(57);
            n.exports = function (n, t) {
                try {
                    u(r, n, t)
                } catch (i) {
                    r[n] = t
                }
                return t
            }
        },
        9137: function (n, t, i) {
            var u = i(7836)
                , f = i(8284)
                , r = u("keys");
            n.exports = function (n) {
                return r[n] || (r[n] = f(n))
            }
        },
        1314: function (n, t, i) {
            var u = i(7583)
                , f = i(460)
                , r = "__core-js_shared__"
                , e = u[r] || f(r, {});
            n.exports = e
        },
        7836: function (n, t, i) {
            var u = i(6268)
                , r = i(1314);
            (n.exports = function (n, t) {
                return r[n] || (r[n] = void 0 !== t ? t : {})
            }
            )("versions", []).push({
                version: "3.9.1",
                mode: u ? "pure" : "global",
                copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
            })
        },
        6782: function (n, t, i) {
            var r = i(5089)
                , u = Math.max
                , f = Math.min;
            n.exports = function (n, t) {
                var i = r(n);
                return i < 0 ? u(i + t, 0) : f(i, t)
            }
        },
        2977: function (n, t, i) {
            var r = i(5044)
                , u = i(3955);
            n.exports = function (n) {
                return r(u(n))
            }
        },
        5089: function (n) {
            var t = Math.ceil
                , i = Math.floor;
            n.exports = function (n) {
                return isNaN(n = +n) ? 0 : (n > 0 ? i : t)(n)
            }
        },
        97: function (n, t, i) {
            var r = i(5089)
                , u = Math.min;
            n.exports = function (n) {
                return n > 0 ? u(r(n), 9007199254740991) : 0
            }
        },
        1324: function (n, t, i) {
            var r = i(3955);
            n.exports = function (n) {
                return Object(r(n))
            }
        },
        2670: function (n, t, i) {
            var r = i(794);
            n.exports = function (n, t) {
                if (!r(n))
                    return n;
                var i, u;
                if (t && "function" == typeof (i = n.toString) && !r(u = i.call(n)) || "function" == typeof (i = n.valueOf) && !r(u = i.call(n)) || !t && "function" == typeof (i = n.toString) && !r(u = i.call(n)))
                    return u;
                throw TypeError("Can't convert object to primitive value");
            }
        },
        8284: function (n) {
            var t = 0
                , i = Math.random();
            n.exports = function (n) {
                return "Symbol(" + String(void 0 === n ? "" : n) + ")_" + (++t + i).toString(36)
            }
        },
        7786: function (n, t, i) {
            var r = i(8640);
            n.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
        },
        3649: function (n, t, i) {
            var o = i(7583)
                , s = i(7836)
                , f = i(4402)
                , h = i(8284)
                , e = i(8640)
                , c = i(7786)
                , r = s("wks")
                , u = o.Symbol
                , l = c ? u : u && u.withoutSetter || h;
            n.exports = function (n) {
                return f(r, n) && (e || "string" == typeof r[n]) || (r[n] = e && f(u, n) ? u[n] : l("Symbol." + n)),
                    r[n]
            }
        },
        8833: function (n, t, i) {
            "use strict";
            var r = i(7263)
                , u = i(4805).filter;
            r({
                target: "Array",
                proto: !0,
                forced: !i(9269)("filter")
            }, {
                filter: function (n) {
                    return u(this, n, arguments.length > 1 ? arguments[1] : void 0)
                }
            })
        },
        4649: function (n, t, i) {
            var u = i(7263)
                , r = i(8494);
            u({
                target: "Object",
                stat: !0,
                forced: !r,
                sham: !r
            }, {
                defineProperty: i(4615).f
            })
        },
        7138: function (n, t, i) {
            var r, u;
            "undefined" != typeof window && window;
            void 0 === (u = "function" == typeof (r = function () {
                "use strict";
                function t() { }
                var n = t.prototype;
                return n.on = function (n, t) {
                    if (n && t) {
                        var i = this._events = this._events || {}
                            , r = i[n] = i[n] || [];
                        return -1 == r.indexOf(t) && r.push(t),
                            this
                    }
                }
                    ,
                    n.once = function (n, t) {
                        if (n && t) {
                            this.on(n, t);
                            var i = this._onceEvents = this._onceEvents || {};
                            return (i[n] = i[n] || {})[t] = !0,
                                this
                        }
                    }
                    ,
                    n.off = function (n, t) {
                        var i = this._events && this._events[n], r;
                        if (i && i.length)
                            return r = i.indexOf(t),
                                -1 != r && i.splice(r, 1),
                                this
                    }
                    ,
                    n.emitEvent = function (n, t) {
                        var i = this._events && this._events[n], u, f, r;
                        if (i && i.length) {
                            for (i = i.slice(0),
                                t = t || [],
                                u = this._onceEvents && this._onceEvents[n],
                                f = 0; f < i.length; f++)
                                r = i[f],
                                    u && u[r] && (this.off(n, r),
                                        delete u[r]),
                                    r.apply(this, t);
                            return this
                        }
                    }
                    ,
                    n.allOff = function () {
                        delete this._events;
                        delete this._onceEvents
                    }
                    ,
                    t
            }
            ) ? r.call(t, i, t, n) : r) || (n.exports = u)
        },
        8070: function (n, t, i) {
            var r, u;
            !function (f) {
                "use strict";
                r = [i(7138)];
                void 0 === (u = function (n) {
                    return function (n, t) {
                        function o(n, t) {
                            for (var i in t)
                                n[i] = t[i];
                            return n
                        }
                        function c(n) {
                            return Array.isArray(n) ? n : "object" == typeof n && "number" == typeof n.length ? h.call(n) : [n]
                        }
                        function i(n, t, r) {
                            if (!(this instanceof i))
                                return new i(n, t, r);
                            var u = n;
                            "string" == typeof n && (u = document.querySelectorAll(n));
                            u ? (this.elements = c(u),
                                this.options = o({}, this.options),
                                "function" == typeof t ? r = t : o(this.options, t),
                                r && this.on("always", r),
                                this.getImages(),
                                f && (this.jqDeferred = new f.Deferred),
                                setTimeout(this.check.bind(this))) : e.error("Bad element for imagesLoaded " + (u || n))
                        }
                        function r(n) {
                            this.img = n
                        }
                        function u(n, t) {
                            this.url = n;
                            this.element = t;
                            this.img = new Image
                        }
                        var f = n.jQuery, e = n.console, h = Array.prototype.slice, s;
                        return i.prototype = Object.create(t.prototype),
                            i.prototype.options = {},
                            i.prototype.getImages = function () {
                                this.images = [];
                                this.elements.forEach(this.addElementImages, this)
                            }
                            ,
                            i.prototype.addElementImages = function (n) {
                                var i, r, t, f, u, e;
                                if ("IMG" == n.nodeName && this.addImage(n),
                                    !0 === this.options.background && this.addElementBackgroundImages(n),
                                    i = n.nodeType,
                                    i && s[i]) {
                                    for (r = n.querySelectorAll("img"),
                                        t = 0; t < r.length; t++)
                                        f = r[t],
                                            this.addImage(f);
                                    if ("string" == typeof this.options.background)
                                        for (u = n.querySelectorAll(this.options.background),
                                            t = 0; t < u.length; t++)
                                            e = u[t],
                                                this.addElementBackgroundImages(e)
                                }
                            }
                            ,
                            s = {
                                1: !0,
                                9: !0,
                                11: !0
                            },
                            i.prototype.addElementBackgroundImages = function (n) {
                                var i = getComputedStyle(n), r, t, u;
                                if (i)
                                    for (r = /url\((['"])?(.*?)\1\)/gi,
                                        t = r.exec(i.backgroundImage); null !== t;)
                                        u = t && t[2],
                                            u && this.addBackground(u, n),
                                            t = r.exec(i.backgroundImage)
                            }
                            ,
                            i.prototype.addImage = function (n) {
                                var t = new r(n);
                                this.images.push(t)
                            }
                            ,
                            i.prototype.addBackground = function (n, t) {
                                var i = new u(n, t);
                                this.images.push(i)
                            }
                            ,
                            i.prototype.check = function () {
                                function t(t, i, r) {
                                    setTimeout(function () {
                                        n.progress(t, i, r)
                                    })
                                }
                                var n = this;
                                this.progressedCount = 0;
                                this.hasAnyBroken = !1;
                                this.images.length ? this.images.forEach(function (n) {
                                    n.once("progress", t);
                                    n.check()
                                }) : this.complete()
                            }
                            ,
                            i.prototype.progress = function (n, t, i) {
                                this.progressedCount++;
                                this.hasAnyBroken = this.hasAnyBroken || !n.isLoaded;
                                this.emitEvent("progress", [this, n, t]);
                                this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, n);
                                this.progressedCount == this.images.length && this.complete();
                                this.options.debug && e && e.log("progress: " + i, n, t)
                            }
                            ,
                            i.prototype.complete = function () {
                                var t = this.hasAnyBroken ? "fail" : "done", n;
                                (this.isComplete = !0,
                                    this.emitEvent(t, [this]),
                                    this.emitEvent("always", [this]),
                                    this.jqDeferred) && (n = this.hasAnyBroken ? "reject" : "resolve",
                                        this.jqDeferred[n](this))
                            }
                            ,
                            r.prototype = Object.create(t.prototype),
                            r.prototype.check = function () {
                                this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                                    this.proxyImage.addEventListener("load", this),
                                    this.proxyImage.addEventListener("error", this),
                                    this.img.addEventListener("load", this),
                                    this.img.addEventListener("error", this),
                                    this.proxyImage.src = this.img.src)
                            }
                            ,
                            r.prototype.getIsImageComplete = function () {
                                return this.img.complete && this.img.naturalWidth
                            }
                            ,
                            r.prototype.confirm = function (n, t) {
                                this.isLoaded = n;
                                this.emitEvent("progress", [this, this.img, t])
                            }
                            ,
                            r.prototype.handleEvent = function (n) {
                                var t = "on" + n.type;
                                this[t] && this[t](n)
                            }
                            ,
                            r.prototype.onload = function () {
                                this.confirm(!0, "onload");
                                this.unbindEvents()
                            }
                            ,
                            r.prototype.onerror = function () {
                                this.confirm(!1, "onerror");
                                this.unbindEvents()
                            }
                            ,
                            r.prototype.unbindEvents = function () {
                                this.proxyImage.removeEventListener("load", this);
                                this.proxyImage.removeEventListener("error", this);
                                this.img.removeEventListener("load", this);
                                this.img.removeEventListener("error", this)
                            }
                            ,
                            u.prototype = Object.create(r.prototype),
                            u.prototype.check = function () {
                                this.img.addEventListener("load", this);
                                this.img.addEventListener("error", this);
                                this.img.src = this.url;
                                this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                                    this.unbindEvents())
                            }
                            ,
                            u.prototype.unbindEvents = function () {
                                this.img.removeEventListener("load", this);
                                this.img.removeEventListener("error", this)
                            }
                            ,
                            u.prototype.confirm = function (n, t) {
                                this.isLoaded = n;
                                this.emitEvent("progress", [this, this.element, t])
                            }
                            ,
                            i.makeJQueryPlugin = function (t) {
                                (t = t || n.jQuery) && ((f = t).fn.imagesLoaded = function (n, t) {
                                    return new i(this, n, t).jqDeferred.promise(f(this))
                                }
                                )
                            }
                            ,
                            i.makeJQueryPlugin(),
                            i
                    }(f, n)
                }
                    .apply(t, r)) || (n.exports = u)
            }("undefined" != typeof window ? window : this)
        }
    }
        , t = {};
    n.n = function (t) {
        var i = t && t.__esModule ? function () {
            return t.default
        }
            : function () {
                return t
            }
            ;
        return n.d(i, {
            a: i
        }),
            i
    }
        ;
    n.d = function (t, i) {
        for (var r in i)
            n.o(i, r) && !n.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: i[r]
            })
    }
        ;
    n.g = function () {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (n) {
            if ("object" == typeof window)
                return window
        }
    }();
    n.o = function (n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }
        ,
        function () {
            "use strict";
            function s(n, t) {
                for (var i, r = 0; r < t.length; r++)
                    i = t[r],
                        i.enumerable = i.enumerable || !1,
                        i.configurable = !0,
                        "value" in i && (i.writable = !0),
                        Object.defineProperty(n, i.key, i)
            }
            function f(n, t, i) {
                return t in n ? Object.defineProperty(n, t, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[t] = i,
                    n
            }
            var h;
            n(8833);
            n(4649);
            var t = Object.assign || function (n) {
                for (var i, r, t = 1; t < arguments.length; t++) {
                    i = arguments[t];
                    for (r in i)
                        Object.prototype.hasOwnProperty.call(i, r) && (n[r] = i[r])
                }
                return n
            }
                , r = function (n) {
                    return "IMG" === n.tagName
                }
                , u = function (n) {
                    return n && 1 === n.nodeType
                }
                , e = function (n) {
                    return ".svg" === (n.currentSrc || n.src).substr(-4).toLowerCase()
                }
                , o = function (n) {
                    try {
                        return Array.isArray(n) ? n.filter(r) : function (n) {
                            return NodeList.prototype.isPrototypeOf(n)
                        }(n) ? [].slice.call(n).filter(r) : u(n) ? [n].filter(r) : "string" == typeof n ? [].slice.call(document.querySelectorAll(n)).filter(r) : []
                    } catch (n) {
                        throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
                    }
                }
                , c = function (n) {
                    var t = document.createElement("div");
                    return t.classList.add("medium-zoom-overlay"),
                        t.style.background = n,
                        t
                }
                , l = function (n) {
                    var i = n.getBoundingClientRect()
                        , r = i.top
                        , u = i.left
                        , f = i.width
                        , e = i.height
                        , t = n.cloneNode()
                        , o = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                        , s = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
                    return t.removeAttribute("id"),
                        t.style.position = "absolute",
                        t.style.top = r + o + "px",
                        t.style.left = u + s + "px",
                        t.style.width = f + "px",
                        t.style.height = e + "px",
                        t.style.transform = "",
                        t
                }
                , i = function (n, i) {
                    var r = t({
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0
                    }, i), u;
                    return "function" == typeof CustomEvent ? new CustomEvent(n, r) : (u = document.createEvent("CustomEvent"),
                        u.initCustomEvent(n, r.bubbles, r.cancelable, r.detail),
                        u)
                };
            !function (n, t) {
                var u, r, i;
                void 0 === t && (t = {});
                u = t.insertAt;
                n && "undefined" != typeof document && (r = document.head || document.getElementsByTagName("head")[0],
                    i = document.createElement("style"),
                    i.type = "text/css",
                    "top" === u && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i),
                    i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n)))
            }(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}");
            var a = function v(n) {
                var tt = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, b = window.Promise || function (n) {
                    function t() { }
                    n(t, t)
                }
                    , it = function (n) {
                        var t = n.target;
                        t !== p ? -1 !== h.indexOf(t) && g({
                            target: t
                        }) : a()
                    }, rt = function () {
                        if (!y && r.original) {
                            var n = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                            Math.abs(nt - n) > f.scrollOffset && setTimeout(a, 150)
                        }
                    }, ut = function (n) {
                        var t = n.key || n.keyCode;
                        "Escape" !== t && "Esc" !== t && 27 !== t || a()
                    }, ft = function () {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = n, e;
                        return (n.background && (p.style.background = n.background),
                            n.container && n.container instanceof Object && (r.container = t({}, f.container, n.container)),
                            n.template) && (e = u(n.template) ? n.template : document.querySelector(n.template),
                                r.template = e),
                            f = t({}, f, r),
                            h.forEach(function (n) {
                                n.dispatchEvent(i("medium-zoom:update", {
                                    detail: {
                                        zoom: s
                                    }
                                }))
                            }),
                            s
                    }, et = function () {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return v(t({}, f, n))
                    }, k = function () {
                        for (var t, i = arguments.length, r = Array(i), n = 0; n < i; n++)
                            r[n] = arguments[n];
                        return t = r.reduce(function (n, t) {
                            return [].concat(n, o(t))
                        }, []),
                            t.filter(function (n) {
                                return -1 === h.indexOf(n)
                            }).forEach(function (n) {
                                h.push(n);
                                n.classList.add("medium-zoom-image")
                            }),
                            w.forEach(function (n) {
                                var i = n.type
                                    , r = n.listener
                                    , u = n.options;
                                t.forEach(function (n) {
                                    n.addEventListener(i, r, u)
                                })
                            }),
                            s
                    }, ot = function () {
                        for (var u, f = arguments.length, t = Array(f), n = 0; n < f; n++)
                            t[n] = arguments[n];
                        return r.zoomed && a(),
                            u = t.length > 0 ? t.reduce(function (n, t) {
                                return [].concat(n, o(t))
                            }, []) : h,
                            u.forEach(function (n) {
                                n.classList.remove("medium-zoom-image");
                                n.dispatchEvent(i("medium-zoom:detach", {
                                    detail: {
                                        zoom: s
                                    }
                                }))
                            }),
                            h = h.filter(function (n) {
                                return -1 === u.indexOf(n)
                            }),
                            s
                    }, st = function (n, t) {
                        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return h.forEach(function (r) {
                            r.addEventListener("medium-zoom:" + n, t, i)
                        }),
                            w.push({
                                type: "medium-zoom:" + n,
                                listener: t,
                                options: i
                            }),
                            s
                    }, ht = function (n, t) {
                        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return h.forEach(function (r) {
                            r.removeEventListener("medium-zoom:" + n, t, i)
                        }),
                            w = w.filter(function (i) {
                                return !(i.type === "medium-zoom:" + n && i.listener.toString() === t.toString())
                            }),
                            s
                    }, d = function () {
                        var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                            , n = c.target
                            , o = function () {
                                var n = {
                                    width: document.documentElement.clientWidth,
                                    height: document.documentElement.clientHeight,
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0
                                }
                                    , i = void 0
                                    , o = void 0;
                                if (f.container)
                                    if (f.container instanceof Object)
                                        i = (n = t({}, n, f.container)).width - n.left - n.right - 2 * f.margin,
                                            o = n.height - n.top - n.bottom - 2 * f.margin;
                                    else {
                                        var h = (u(f.container) ? f.container : document.querySelector(f.container)).getBoundingClientRect()
                                            , p = h.width
                                            , w = h.height
                                            , b = h.left
                                            , k = h.top;
                                        n = t({}, n, {
                                            width: p,
                                            height: w,
                                            left: b,
                                            top: k
                                        })
                                    }
                                i = i || n.width - 2 * f.margin;
                                o = o || n.height - 2 * f.margin;
                                var s = r.zoomedHd || r.original
                                    , d = e(s) ? i : s.naturalWidth || i
                                    , g = e(s) ? o : s.naturalHeight || o
                                    , c = s.getBoundingClientRect()
                                    , nt = c.top
                                    , tt = c.left
                                    , a = c.width
                                    , v = c.height
                                    , it = Math.min(d, i) / a
                                    , rt = Math.min(g, o) / v
                                    , l = Math.min(it, rt)
                                    , y = "scale(" + l + ") translate3d(" + ((i - a) / 2 - tt + f.margin + n.left) / l + "px, " + ((o - v) / 2 - nt + f.margin + n.top) / l + "px, 0)";
                                r.zoomed.style.transform = y;
                                r.zoomedHd && (r.zoomedHd.style.transform = y)
                            };
                        return new b(function (t) {
                            var c, v, e, w;
                            if (n && -1 === h.indexOf(n))
                                t(s);
                            else if (r.zoomed)
                                t(s);
                            else {
                                if (n)
                                    r.original = n;
                                else {
                                    if (!(h.length > 0))
                                        return void t(s);
                                    c = h;
                                    r.original = c[0]
                                }
                                (r.original.dispatchEvent(i("medium-zoom:open", {
                                    detail: {
                                        zoom: s
                                    }
                                })),
                                    nt = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                                    y = !0,
                                    r.zoomed = l(r.original),
                                    document.body.appendChild(p),
                                    f.template) && (v = u(f.template) ? f.template : document.querySelector(f.template),
                                        r.template = document.createElement("div"),
                                        r.template.appendChild(v.content.cloneNode(!0)),
                                        document.body.appendChild(r.template));
                                (document.body.appendChild(r.zoomed),
                                    window.requestAnimationFrame(function () {
                                        document.body.classList.add("medium-zoom--opened")
                                    }),
                                    r.original.classList.add("medium-zoom-image--hidden"),
                                    r.zoomed.classList.add("medium-zoom-image--opened"),
                                    r.zoomed.addEventListener("click", a),
                                    r.zoomed.addEventListener("transitionend", function b() {
                                        y = !1;
                                        r.zoomed.removeEventListener("transitionend", b);
                                        r.original.dispatchEvent(i("medium-zoom:opened", {
                                            detail: {
                                                zoom: s
                                            }
                                        }));
                                        t(s)
                                    }),
                                    r.original.getAttribute("data-zoom-src")) ? (r.zoomedHd = r.zoomed.cloneNode(),
                                        r.zoomedHd.removeAttribute("srcset"),
                                        r.zoomedHd.removeAttribute("sizes"),
                                        r.zoomedHd.src = r.zoomed.getAttribute("data-zoom-src"),
                                        r.zoomedHd.onerror = function () {
                                            clearInterval(e);
                                            console.warn("Unable to reach the zoom image target " + r.zoomedHd.src);
                                            r.zoomedHd = null;
                                            o()
                                        }
                                        ,
                                        e = setInterval(function () {
                                            r.zoomedHd.complete && (clearInterval(e),
                                                r.zoomedHd.classList.add("medium-zoom-image--opened"),
                                                r.zoomedHd.addEventListener("click", a),
                                                document.body.appendChild(r.zoomedHd),
                                                o())
                                        }, 10)) : r.original.hasAttribute("srcset") ? (r.zoomedHd = r.zoomed.cloneNode(),
                                            r.zoomedHd.removeAttribute("sizes"),
                                            r.zoomedHd.removeAttribute("loading"),
                                            w = r.zoomedHd.addEventListener("load", function () {
                                                r.zoomedHd.removeEventListener("load", w);
                                                r.zoomedHd.classList.add("medium-zoom-image--opened");
                                                r.zoomedHd.addEventListener("click", a);
                                                document.body.appendChild(r.zoomedHd);
                                                o()
                                            })) : o()
                            }
                        }
                        )
                    }, a = function () {
                        return new b(function (n) {
                            !y && r.original ? (y = !0,
                                document.body.classList.remove("medium-zoom--opened"),
                                r.zoomed.style.transform = "",
                                r.zoomedHd && (r.zoomedHd.style.transform = ""),
                                r.template && (r.template.style.transition = "opacity 150ms",
                                    r.template.style.opacity = 0),
                                r.original.dispatchEvent(i("medium-zoom:close", {
                                    detail: {
                                        zoom: s
                                    }
                                })),
                                r.zoomed.addEventListener("transitionend", function t() {
                                    r.original.classList.remove("medium-zoom-image--hidden");
                                    document.body.removeChild(r.zoomed);
                                    r.zoomedHd && document.body.removeChild(r.zoomedHd);
                                    document.body.removeChild(p);
                                    r.zoomed.classList.remove("medium-zoom-image--opened");
                                    r.template && document.body.removeChild(r.template);
                                    y = !1;
                                    r.zoomed.removeEventListener("transitionend", t);
                                    r.original.dispatchEvent(i("medium-zoom:closed", {
                                        detail: {
                                            zoom: s
                                        }
                                    }));
                                    r.original = null;
                                    r.zoomed = null;
                                    r.zoomedHd = null;
                                    r.template = null;
                                    n(s)
                                })) : n(s)
                        }
                        )
                    }, g = function () {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                            , t = n.target;
                        return r.original ? a() : d({
                            target: t
                        })
                    }, ct = function () {
                        return f
                    }, lt = function () {
                        return h
                    }, at = function () {
                        return r.original
                    }, h = [], w = [], y = !1, nt = 0, f = tt, r = {
                        original: null,
                        zoomed: null,
                        zoomedHd: null,
                        template: null
                    }, p, s;
                return "[object Object]" === Object.prototype.toString.call(n) ? f = n : (n || "string" == typeof n) && k(n),
                    f = t({
                        margin: 0,
                        background: "#fff",
                        scrollOffset: 40,
                        container: null,
                        template: null
                    }, f),
                    p = c(f.background),
                    document.addEventListener("click", it),
                    document.addEventListener("keyup", ut),
                    document.addEventListener("scroll", rt),
                    window.addEventListener("resize", a),
                    s = {
                        open: d,
                        close: a,
                        toggle: g,
                        update: ft,
                        clone: et,
                        attach: k,
                        detach: ot,
                        on: st,
                        off: ht,
                        getOptions: ct,
                        getImages: lt,
                        getZoomedImage: at
                    }
            }
                , y = n(8070)
                , p = n.n(y);
            h = function () {
                function n() {
                    !function (n, t) {
                        if (!(n instanceof t))
                            throw new TypeError("Cannot call a class as a function");
                    }(this, n);
                    f(this, "enabled", !0);
                    f(this, "minWidth", 800);
                    f(this, "background", "rgba(0, 0, 0, .8)")
                }
                return function (n, t, i) {
                    return t && s(n.prototype, t),
                        i && s(n, i),
                        n
                }(n, [{
                    key: "apply",
                    value: function (n) {
                        if (this.enabled) {
                            var t = this.minWidth
                                , i = this.background
                                , r = $(n).filter(function (n, t) {
                                    var i, r, u, f;
                                    return !(t.onclick || null !== (i = t.parentElement) && void 0 !== i && i.onclick || "a" === (null === (r = t.parentElement) || void 0 === r ? void 0 : r.tagName.toLowerCase()) || null !== (u = t.parentElement) && void 0 !== u && null !== (f = u.parentElement) && void 0 !== f && f.onclick)
                                })
                                , u = p()(r.get());
                            u.on("progress", function (n, r) {
                                var u = null == r ? void 0 : r.img;
                                u && function (n) {
                                    n.naturalWidth > t && a(n, {
                                        background: i
                                    })
                                }(u)
                            })
                        }
                    }
                }]),
                    n
            }();
            window.zoomManager = new h
        }()
}();
BigBannerDelivery.prototype.deliver = function () {
    if (this.canShowBanner()) {
        var n = this;
        $.getJSON("https://a1.cnblogs.com/group/C0").done(function (t) {
            t && t.C0 && $.ajax({
                url: "/ajax/bigbanner/get",
                type: "get",
                contentType: "application/json; charset=UTF-8"
            }).done(function (t) {
                t && t.id && t.imageUrl && t.clickThroughUrl && (n.creative = {
                    id: t.id,
                    imageUrl: t.imageUrl,
                    clickThroughUrl: t.clickThroughUrl,
                    tag: t.tag
                },
                    n.deliverToSkin())
            })
        })
    }
}
    ;
BigBannerDelivery.prototype.clickAd = function () {
    this.clickThrough(this.creative.id);
    this.takeAway();
    this.setBannerCookie(6e3);
    ga("send", "event", "Link", "click", this.creative.tag)
}
    ;
BigBannerDelivery.prototype.closeAd = function () {
    this.takeAway();
    this.setBannerCookie(6e3)
}
    ;
$(function () {
    provisionWechatShare()
});
