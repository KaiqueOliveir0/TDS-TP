import axios from "axios";

export function getMe(p_Token) {
  
}

export function request(p_Url, p_Body = null, p_Token = null) {
  axios.get(v_Url + '?token=' + v_Token)
    .then(p_Response => {
      setResponse(p_Response.data);
    })
    .catch(() => {
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  if (p_Token != null)
    v_Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", p_Token);

  var v_Result = v_Response.Result.Content.ReadAsStringAsync();
  var v_Json = JsonConvert.DeserializeObject<JObject>(v_Result.Result);
  return v_Json;
}