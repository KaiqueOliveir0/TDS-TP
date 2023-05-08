using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ZoomIntoSpotify.Utils
{
    public class Requester
    {
        public static JObject Request(string p_Url, HttpMethod p_Method, Dictionary<string,string> p_Body = null, string p_Token = null)
        {
            using (var v_Client = new HttpClient())
            {
                if (p_Token != null) 
                    v_Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", p_Token);
                
                Task<HttpResponseMessage> v_Response;
                if (p_Method == HttpMethod.Get)
                    v_Response = v_Client.GetAsync(p_Url);
                else
                    v_Response = v_Client.PostAsync(p_Url, new FormUrlEncodedContent(p_Body));
                
                var v_Result = v_Response.Result.Content.ReadAsStringAsync();
                var v_Json = JsonConvert.DeserializeObject<JObject>(v_Result.Result);
                return v_Json;
            }
        }
    }
}