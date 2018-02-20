import axios from "axios";


export default{
	fetchRepos: function(lang){
		console.log(lang);
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+lang+'&sort=stars&order=desc&type=Repositories');
		return fetch(encodedURI).then((response)=>{
			//console.log(response.json());
			return response.json();
		});
	}
}