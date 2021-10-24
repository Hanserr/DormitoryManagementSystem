let Oss = require('ali-oss')

export function client(){
  return new Oss({
    region:'',
    accessKeyId:'',
    accessKeySecret:'',
    bucket:''
  })
}

export const getFileNameUUID = () => {
  function randomID(){
    return((1+Math.random())*0x10000 | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${randomID()}${randomID()}`
}
