const express = require("express");
const PORT = process.env.PORT || 8080;
// const ytdl = require("ytdl-core");
const cors = require("cors");
// const fs = require("fs");
const fetch = require("node-fetch");
const tiny = require("tinyurl");
const axios = require("axios");
const y2mate = require("./y2mate");

// const { Logger } = require("./unused/mylogger");

// const mylogger = new Logger();

// console = mylogger;

// const { ffmpegProcess, merge } = require("./ffmpegProcess");
const {
  promiseSetTimeOut,
  getDownloadLinkByItag,
  toNumber,
} = require("./helper");

// const { iTags, iTagAudio } = require("./itag");
// const { Duplex } = require("stream");
// const yt = require("youtube-info-streams");
// const youtubedl = require("youtube-dl");
// const youtubedl = require("youtube-dl-exec");
// const { downloadMp3, downloadMp4 } = require("youtube-downloader-api");

const app = express();
// app.use(express.static(__dirname + "/public"));
app.use(cors({ credentials: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.json("ok");
// });

const isEqual = (format, format1) => {
  return (
    format.container == format1.container &&
    format.hasAudio == format1.hasAudio &&
    format.hasVideo == format1.hasVideo &&
    format.quality == format1.quality &&
    format.mimeType == format1.mimeType &&
    format.audioBitrate == format1.audioBitrate
  );
};

const getVideoLink = async (url, q = "360") => {
  if (q.includes("y")) {
    console.log("qy");
    q = q.substring(0, q.length - 1);
    console.log("after removing y: ", q);
    const { dlink, status, title, highestQ, msg, quality } =
      await y2mate.GetVideo(url, q);
    if (status == "ok") {
      const tinyurl = await tiny.shorten(dlink);
      return { urlDown: tinyurl, title, highestQ, quality };
    } else return { error: msg, status };
  }

  // q = toNumber(q);
  // // youtubedl.getInfo(url, (err, info) => {
  // //   fs.writeFileSync("data1.json", JSON.stringify(info));
  // // });

  // // youtubedl.default(url,false,{

  // // })

  // // youtubedl.getInfo()

  // // downloadMp4(url, "./", "gh.mp4");

  // // const subprocess = youtubedl.exec(
  // //   "https://www.youtube.com/watch?v=r00ikilDxW4",
  // //   {
  // //     dumpSingleJson: true,
  // //   }
  // // );

  // // console.log(`Running subprocess as ${subprocess.pid}`);

  // // subprocess.stdout.pipe(fs.createWriteStream("stdout.txt"));
  // // subprocess.stderr.pipe(fs.createWriteStream("stderr.txt"));

  // const info = await ytdl.getInfo(url);

  // // console.log(info);
  // // const ytID = "r00ikilDxW4";
  // // console.log("ytid: ", ytID);
  // // const info = await yt.info(ytID);
  // // const info = await youtubedl.download(ytID);
  // // yt.info()
  // // let format = ytdl.chooseFormat(info.formats, { quality: `${iTags[360]}` });
  // // fs.writeFileSync("data1.json", JSON.stringify(info));

  // // const {formats,adaptiveFormats}=info.player_response.streamingData
  // // formats[0]

  // const { formats } = info;

  // // console.log("formats: ", formats);

  // // getting title so using ytdl anyway
  // const title = info.videoDetails.title;

  // let quality;
  // // if (q <= 480) {
  // // quality = 360;
  // // } else {

  // if (q > 480) {
  //   const reqBASEURL = "https://youtube-dl.wave.video/info";
  //   const reqURL = reqBASEURL + `?url=${encodeURIComponent(url)}&type=video`;

  //   const response = await fetch(reqURL);
  //   const data = await response.json();
  //   const dataFormats = data.formats;
  //   const waveFormat = dataFormats.find((format) => format.format_id === "22");
  //   if (!waveFormat) {
  //     throw new Error("HD video not available");
  //   }
  //   let dURL = waveFormat.downloadUrl;
  //   dURL = dURL + "%20720p";
  //   console.log("durl: ", dURL);

  //   const urlDown = await tiny.shorten(dURL);

  //   return { urlDown, title, highestQ: "720", quality: "720" };
  // } else {
  //   //   const waveFormat = dataFormats.find((format) => format.format_id === "18");
  //   //   if (!waveFormat) {
  //   //     throw new Error("Video not available");
  //   //   }
  //   //   let dURL = waveFormat.downloadUrl;
  //   //   dURL = dURL + "%20360p";
  //   //   console.log("durl: ", dURL);

  //   //   const urlDown = await tiny.shorten(dURL);

  //   //   return { urlDown, title, highestQ: "720", quality: "360" };
  //   // }

  //   // // }
  //   quality = 360;
  //   const itag = iTags[quality];

  //   let dURL = getDownloadLinkByItag(formats, itag);

  //   dURL = dURL + `&title=${encodeURIComponent(title)}`;

  //   const urlDown = await tiny.shorten(dURL);
  //   console.log("video durl: ", dURL);

  //   return { urlDown, title, highestQ: "720", quality: "360" };
  // }

  // try {
  //   const format1 = ytdl.chooseFormat(info.formats, { quality: `${iTags[q]}` });
  //   console.log("🚀 ~ file: app.js ~ line 23 ~ app.post ~ format", format1);

  //   // ytdl.downloadFromInfo(format).pipe(fs.createWriteStream("video.mp4"));
  //   const video = ytdl(url, {
  //     filter: (format) => {
  //       // format1.container === "mp4" && format1.hasAudio === true,
  //       // console.log("🚀 ~ file: app.js ~ line 33 ~ app.post ~ format1", format1);

  //       return isEqual(format, format1);
  //     },
  //   });

  //   const format2 = ytdl.chooseFormat(info.formats, { quality: `250` });
  //   console.log("🚀 ~ file: app.js ~ line 54 ~ app.post ~ format2", format2);

  //   // ytdl.downloadFromInfo(format).pipe(fs.createWriteStream("video.mp4"));
  //   const audio = ytdl(url, {
  //     filter: (format) => {
  //       // format1.container === "mp4" && format1.hasAudio === true,
  //       // console.log("🚀 ~ file: app.js ~ line 33 ~ app.post ~ format1", format1);

  //       return isEqual(format, format2);
  //     },
  //   });

  //   // video.pipe(ffmpegProcess.stdio[3]);
  //   // audio.pipe(ffmpegProcess.stdio[4]);
  //   // ffmpegProcess.stdio[1].pipe(fs.createWriteStream("newVideo.mp4"));

  //   // video.pipe(fs.createWriteStream("video1.mp4"));
  //   // audio.pipe(fs.createWriteStream("audio1.mp3"));
  //   await promiseSetTimeOut(5000);
  //   await merge("./video1.mp4", "./audio1.mp3");
  // } catch (err) {
  //   console.log(err);
  //   throw new Error("this format is not available");
};
// };

// const getAudioLink = async (url) => {
//   const info = await ytdl.getInfo(url);
//   info.formats;
//   const { initRange } = info.player_response.streamingData.adaptiveFormats[0];
//   // const { start, end } = initRange;

//   const { formats } = info;
//   const title = info.videoDetails.title;

//   const itag = "140";
//   let dobj = getDownloadLinkByItag(formats, itag);
//   let dURL = dobj.url;
//   const end = dobj.cL;
//   dURL = dURL + `&title=${encodeURIComponent(title)}&range=0-${end}`;

//   console.log("audio durl: ", dURL);

//   const urlDown = await tiny.shorten(dURL);
//   // const urlDown = dURL;

//   return { urlDown, title };

//   // const format2 = ytdl.chooseFormat(info.formats, { quality: `140` });
//   // console.log("🚀 ~ file: app.js ~ line 54 ~ app.post ~ format2", format2);

//   // try {
//   //   // ytdl.downloadFromInfo(format).pipe(fs.createWriteStream("video.mp4"));
//   //   const audio = ytdl(url, {
//   //     filter: (format) => {
//   //       // format1.container === "mp4" && format1.hasAudio === true,
//   //       // console.log("🚀 ~ file: app.js ~ line 33 ~ app.post ~ format1", format1);

//   //       return isEqual(format, format2);
//   //     },
//   //   });

//   //   return audio;
//   // } catch (err) {
//   //   console.log(err);
//   //   throw new Error(err.toString());
//   // }
// };

// const getAxiosData = async (url, body) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(hosturl, {
//         url,
//       })
//       .then((res) => {
//         return res;
//       })
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

// using ssyoutube to get the 720p version
const special720 = async (url) => {
  console.log("in special720");
  const hosturl = "https://ssyoutube.com/api/convert";
  // axios.post()

  try {
    const resp = await axios.post(hosturl, {
      url,
    });

    // axios
    //   .post(hosturl, {
    //     url,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });

    // console.log(res);

    const data = resp.data;
    // const data = await getAxiosData(hosturl, { url });
    // console.log("data: ", data);
    let urlDown = null;
    if (data.url[0]?.quality === "720") {
      urlDown = data.url[0]?.url;
    }
    const title = data?.meta?.title;
    console.log(urlDown);
    return { urlDown, title, highestQ: "720", quality: "720c" };
  } catch (err) {
    console.log(err);
  }
};

// for audio q must be 128 and for rest its quality
app.post("/getLink", async (req, res) => {
  let { url, q } = req.body; // q is number, url is string
  console.log("url: ", url);
  console.log("q: ", q);
  console.log("qtype: ", typeof q);

  if (q === "128y") {
    const { dlink, status, title } = await y2mate.GetAudio(url);
    const urlDown = await tiny.shorten(dlink);
    res.json({ urlDown, title });
    return;
  }

  if (!q) {
    q = 128;
  }

  try {
    if (q === "720c") {
      const video = await special720(url);
      res.json(video);
      return;
    }
  } catch (err) {
    res.status(500).json("some error");
    return;
  }

  // const valid_q = [128, 144, 240, 360, 480, 720, 1080];
  const valid_q = [144, 240, 360, 480, 720, 1080];

  // q = Number(q);
  if (!valid_q.includes(toNumber(q))) {
    res.status(400).json("invalid quality");
    return;
  }

  console.log("isvalid");

  // if (toNumber(q) === 128) {
  //   console.log("in audio");
  //   try {
  //     const audio = await getAudioLink(url);
  //     // audio.pipe(res);
  //     res.json(audio);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json("some error");
  //   }

  //   return;
  // }

  try {
    console.log("in video");
    const video = await getVideoLink(url, q);
    // console.releaseLog();
    // fs.createReadStream("./merged.mp4").pipe(res);
    res.json(video);
  } catch (err) {
    console.log(err);
    // console.releaseLog();
    res.status(500).json(`error: ${err}`);
  }

  // ytdl
  //   .getInfo(url)
  //   .then((data) => {
  //     //   console.log(data);
  //     //   fs.writeFileSync("data.json", JSON.stringify(data));
  //     const formats = [...data.formats, data.adaptiveFormats];
  //     fs.writeFileSync("data.json", JSON.stringify(formats));

  //     //   let format = ytdl.chooseFormat(formats, { filter: "video" });
  //     //   console.log("Format found! ", format);

  //     res.json(data);
  //   })
  //   .catch(console.log);
});

app.listen(PORT, () => {
  console.log(`app is running in ${PORT}`);
  // console.releaseLog();
});
