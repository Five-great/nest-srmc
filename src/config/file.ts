import { join } from 'path';
import * as fs from 'fs';
import {BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];
const otherFile = ['doc','docx', 'rar','txt','pdf'];
export default {
  root: join(__dirname, '../uploads'),
  storage: diskStorage({
    destination: (req, file, cb) => {
      const mimeType = file.originalname.substring(file.originalname.lastIndexOf('.') + 1,file.originalname.length); 
      console.log(file)
      let temp = 'other';
      image.filter(item => item === mimeType).length > 0
        ? (temp = 'image')
        : '';
      video.filter(item => item === mimeType).length > 0
        ? (temp = 'video')
        : '';
      audio.filter(item => item === mimeType).length > 0
        ? (temp = 'audio')
        : '';
      otherFile.filter(item => item === mimeType).length > 0
        ? (temp = 'otherFile')
        : '';
     let TemDate =new Date().toLocaleDateString().split('-')
     let filePath = join(__dirname,`../uploads/${temp}/${TemDate[0]}/${TemDate[1]}/${TemDate[2]}`);
     const pathArr = filePath.split('\\');
        let checkPath = pathArr[0];
        pathArr.shift();
        let item: string;
        for (item of pathArr) {
          checkPath += `/${item}`;
          if (!fs.existsSync(checkPath)) {
            fs.mkdirSync(checkPath);
          }
        }
      
      cb(null,filePath);
    },
    filename: (req, file, cb) => {
      // console.log(req.body)
      const filename = `${new Date().getTime()}.${file.originalname.substring(file.originalname.lastIndexOf('.') + 1,file.originalname.length)}`;
      return cb(null, filename);
    },
   }),
    fileFilter(req, file, cb) {
      // const mimeType = file.mimetype.split('/')[1].toLowerCase();
      // console.log(req)
      // console.log(file)
      const mimeType = file.originalname.substring(file.originalname.lastIndexOf('.') + 1,file.originalname.length); 
      file.mimetype = mimeType;
      let temp = 'other';
      image.filter(item => item === mimeType).length > 0
        ? (temp = 'image')
        : '';
      video.filter(item => item === mimeType).length > 0
        ? (temp = 'video')
        : '';
      audio.filter(item => item === mimeType).length > 0
        ? (temp = 'audio')
        : '';
      otherFile.filter(item => item === mimeType).length > 0
        ? (temp = 'otherFile')
        : '';
      if (temp === 'other') {
        return cb(new BadRequestException('文件格式错误！或不支持该文件上传'), false);
      }
      return cb(null, true);
    }
};
