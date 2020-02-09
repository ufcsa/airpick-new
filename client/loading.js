import axios from 'axios';
import { message } from 'antd';

message.config({
	top: 50,
	maxCount: 1
});
//intercept requetsts
axios.interceptors.request.use(function(config) {
	message.loading('loading', 0);
	return config;
});

//intercept response
axios.interceptors.response.use(function(config) {
	message.destroy();
	return config;
});
