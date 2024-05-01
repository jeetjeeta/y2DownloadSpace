const axios = require("axios");
// const anaylzeURL = "https://www.y2mate.com/mates/analyzeV2/ajax";
// const anaylzeURL = "https://x2download.app/api/ajaxSearch";
const anaylzeURL = "https://tomp3.cc/api/ajax/search?hl=en";
const serverURL =
  "https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994";

const { promiseSetTimeOut, toNumber } = require("./helper");

// this will convert the video to mp4/mp3 and we send payload (vid,k)
// maybe c_status is converting so we check again by calling convert again after 5s
const convert = async (vid, k) => {
  const mp3convertURL = "https://tomp3.cc/api/ajax/convert?hl=en";
  const res2 = await axios({
    method: "post",
    url: mp3convertURL,
    headers: {
      "content-type": "multipart/form-data",
    },
    data: {
      vid,
      k,
    },
  });

  const data2 = res2.data;

  console.log("res2Data: ", data2);

  if (data2.c_status === "CONVERTING") {
    await promiseSetTimeOut(5000);
    return await convert(vid, k);
  }

  return { dlink: data2.dlink, status: "ok" };
};

const GetVideo = async (ytURL, q = "720") => {
  try {
    const res = await axios({
      method: "post",
      url: anaylzeURL,
      headers: {
        "content-type": "multipart/form-data",
      },
      //   data: {
      //     k_query: ytURL,
      //     k_page: "Youtube Downloader",
      //     hl: "en",
      //     a_auto: 0,
      //   },
      // data: {
      //   q: ytURL,
      //   vt: "home",
      // },
      data: {
        query: ytURL,
        vt: "downloader",
      },
    });

    const data1 = res.data;

    console.log("resData1: ", data1);

    const { title } = data1;

    const valid_q = [144, 240, 360, 480, 720, 1080];

    if (!valid_q.includes(toNumber(q))) {
      console.log("invalid quantity");
      return { status: "error", msg: "invalid quantity" };
    }

    // let quality=
    // const highestQ = quality;
    // quality = Number(quality) > Number(q) ? q : quality;

    // let k = "0";

    let k = 0;
    let highestobj;
    let qualityN = 0;
    let quality;
    for (let n in data1.links.mp4) {
      const obj = data1.links.mp4[n];

      if (toNumber(obj.q) != null && toNumber(obj.q) > qualityN) {
        qualityN = Number(obj.q);
        highestobj = obj;
      }
      if (obj.q === q + "p") {
        k = obj.k;
      }
    }

    const highestQ = qualityN.toString();

    if (k == 0) {
      k = highestobj.k;
      quality = highestobj.q;
    } else {
      quality = q;
    }

    // if (k === "0") {
    //   console.log("not found");
    //   return { status: "error", msg: "Not found" };
    // }

    // const { k } = data1.links.mp4["136"];

    console.log("k: ", k);

    const { dlink, status } = await convert(data1.vid, k);

    return { dlink, status, title, highestQ, quality };

    // const { vid, title, fn, token, timeExpires } = data;
    // console.log(
    //   "🚀 ~ file: y2mate.js ~ line 32 ~ GetVideo ~ vid, title, fn, token, timeExpires",
    //   vid,
    //   title,
    //   fn,
    //   token,
    //   timeExpires
    // );

    // const res2 = await axios({
    //   method: "post",
    //   url: serverURL,
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },

    //   data: {
    //     v_id: vid,
    //     ftype: "mp4",
    //     fquality: q + "p",
    //     token: token,
    //     timeExpire: timeExpires,
    //     client: "X2Download.app",
    //   },
    // });

    // const data2 = await res2.data;

    // console.log("res2Data: ", res2.data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const GetAudio = async (ytURL) => {
  try {
    const res = await axios({
      method: "post",
      url: anaylzeURL,
      headers: {
        "content-type": "multipart/form-data",
      },
      //   data: {
      //     k_query: ytURL,
      //     k_page: "Youtube Downloader",
      //     hl: "en",
      //     a_auto: 0,
      //   },
      // data: {
      //   q: ytURL,
      //   vt: "home",
      // },
      data: {
        query: ytURL,
        vt: "downloader",
      },
    });

    const data1 = res.data;
    const { title } = data1;

    console.log("resData1: ", data1);

    // const valid_q = [144, 240, 360, 480, 720, 1080];

    // if (!valid_q.includes(Number(q))) {
    //   console.log("invalid quantity");
    //   return { status: "error", msg: "invalid quantity" };
    // }

    // let quality=
    // const highestQ = quality;
    // quality = Number(quality) > Number(q) ? q : quality;

    let k = "0";

    // for (let n in data1.links.mp4) {
    //   const obj = data1.links.mp4[n];
    //   if (obj.q === q + "p") {
    //     k = obj.k;
    //   }
    // }

    if (data1.links.mp3.mp3128.k) {
      k = data1.links.mp3.mp3128.k;
    }
    if (k === "0") {
      console.log("not found");
      return { status: "error", msg: "Not found" };
    }

    // const { k } = data1.links.mp4["136"];

    console.log("k: ", k);

    const { dlink, status } = await convert(data1.vid, k);

    return { dlink, status, title };

    // const { vid, title, fn, token, timeExpires } = data;
    // console.log(
    //   "🚀 ~ file: y2mate.js ~ line 32 ~ GetVideo ~ vid, title, fn, token, timeExpires",
    //   vid,
    //   title,
    //   fn,
    //   token,
    //   timeExpires
    // );

    // const res2 = await axios({
    //   method: "post",
    //   url: serverURL,
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },

    //   data: {
    //     v_id: vid,
    //     ftype: "mp4",
    //     fquality: q + "p",
    //     token: token,
    //     timeExpire: timeExpires,
    //     client: "X2Download.app",
    //   },
    // });

    // const data2 = await res2.data;

    // console.log("res2Data: ", res2.data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = { GetVideo, GetAudio };
