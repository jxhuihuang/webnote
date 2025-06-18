const currentUrl = window.location.href; //获取当前url
function proxy() {
  const { NODE_ENV } = process.env;
  // console.log("process.env:", process.env);
  if (NODE_ENV === "production") {
    const blogApp = currentBlogApp || ""; //博客后缀
    return currentUrl.split(blogApp)[0] + blogApp;
  }
  return "/proxys/webqiand"; // test
}


function proxy1() {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === "production") {
    return "https://account.cnblogs.com";
  }
  return "/acproxys"; // test
}



export const baseUrl = proxy();
export const baseUrl1 = proxy1();


