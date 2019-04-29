// import fetch from 'isomorphic-fetch'
const fetch = require("isomorphic-fetch");
const qs = require('qs');
// import qs from 'qs';
const config = require('../config/dev');
// import config from '../config/dev';

class ApiRequest {
  constructor(baseUrl) {
    this.baseUrl = 'http://localhost:3000/';
  }

  static authorize = (baseUrl, endpoint, email) => {
    let config = {
      credentials: 'same-origin',
  		method: 'post',
  		headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
  		},
      body: JSON.stringify({ email })
    };
    return fetch(baseUrl + endpoint, config).then(ApiRequest.returnStatusAndJson);
	}
	
	setToken(token) {
		this.token = token;
	}

  static returnStatusAndJson = response => {
		return new Promise((resolve, reject) => {
      return response.json()
      .then(json => {
				if (response.status >= 400) return reject(json)
				resolve(json);
			})
      .catch(() => reject({status: response.status, json: null}));
		})
  }

	getConfig(method, data) {
		let config = {
      credentials: 'same-origin',
			method: method,
			headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
				'Authorization': 'Bearer ' + this.token
			}
		};

    if(data) {
      config.body = JSON.stringify(data);
    }
    return config;
	}

  postFormDataConfig(formData) {
    let config = {
      credentials: 'same-origin',
      method: 'post',
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    };

    return config;
  }

	get(endpoint, query) {
    let url = this.baseUrl + endpoint;
    console.log(url);
    url = query ? url + "?" + qs.stringify(query, {strictNullHandling: true}) : url;
    console.log(fetch(url, this.getConfig('get')).then(ApiRequest.returnStatusAndJson));
    return fetch(url, this.getConfig('get')).then(ApiRequest.returnStatusAndJson);
	}

  post(endpoint, data) {
		return fetch(this.baseUrl + endpoint, this.getConfig('post', data)).then(ApiRequest.returnStatusAndJson);
	}

  put(endpoint, data) {
		return fetch(this.baseUrl + endpoint, this.getConfig('put', data)).then(ApiRequest.returnStatusAndJson);
	}

  delete(endpoint) {
		return fetch(this.baseUrl + endpoint, this.getConfig('delete')).then(ApiRequest.returnStatusAndJson);
	}

  postFormData(endpoint, formData) {
    return fetch(this.baseUrl + endpoint, this.postFormDataConfig(formData)).then(ApiRequest.returnStatusAndJson);
  }
}


export default new ApiRequest(config.baseUrl)
	// token: localStorage.getItem(config.tokenKeyName)
