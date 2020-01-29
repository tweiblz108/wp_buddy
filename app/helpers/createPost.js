const WPAPI = require("wpapi");
const { JSDOM } = require("jsdom");

const wp = new WPAPI({
  endpoint: "https://a1.pomometer.com:20003/?rest_route=/",
  username: "admin",
  password: "tweiblz@1"
});

const createPost = async content => {
  const document = new JSDOM(content).window.document;

  const jsContent = document.querySelector("#js_content");

  if (jsContent) {
    jsContent.style.visibility = "visible";

    document.querySelectorAll("img").forEach(e => {
      if (e.dataset["src"]) {
        e.src = e.dataset["src"]; //+ '&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'
        e.style.margin = "0 auto";

        // 绕过微信的防盗链
        e.setAttribute("referrerpolicy", "no-referrer");
      }
    });
  }

  const activityName = document
    .querySelector("#activity-name")
    .innerHTML.trim();
  const wpContent = jsContent.outerHTML;

  const { id } = await wp.posts().create({
    title: activityName,
    content: wpContent,
    status: "publish"
  });
};
module.exports = createPost;
