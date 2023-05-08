export const msToMmSsString = (p_TimeInMs) => {
  let v_Minutes = p_TimeInMs / 1000 / 60;
  let v_Seconds = Math.floor((v_Minutes % 1) * 60);
  if (v_Seconds < 10) v_Seconds = '0' + v_Seconds
  v_Minutes = (Math.floor(v_Minutes));
  return v_Minutes + ':' + v_Seconds;
}