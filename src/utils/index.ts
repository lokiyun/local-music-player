export const joinTime = (time: string) => {
  return time.split('.')[0]
}

export const time2Str = (value: number) => {
  // 计算分钟 单数返回 ‘01’，多位数 ‘010’
  const minutes = "0" + Math.floor(value / 60)
  // 计算秒数 单数返回 ‘02’，多位数返回 ‘020’
  const seconds = "0" + Math.floor(value - parseInt(minutes) * 60)
  return minutes.substr(-2) + ":" + seconds.substr(-2)
}