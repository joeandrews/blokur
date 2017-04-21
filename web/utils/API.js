'use strict';
import {
	browserHistory
}
from 'react-router';
import 'whatwg-fetch';

class API {

	xhrRequest(data) {

		let headers = new Headers({});
		headers.append('content-type', 'application/json');
		let deffered = new Promise((resolve, reject) => {

			fetch('http://localhost:8081' + data.path, {
					method: data.method,
					headers: headers,
					mode: 'cors',
					body: JSON.stringify(data.body),
				})
				.then((responseObj) => {
					let regEx = /^[2][0-9][0-9]$/;
					if (regEx.test(responseObj.status)) {

						resolve(responseObj);

					} else {

						reject(responseObj);

					}

				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		});

		return deffered;



	}



}

export default new API();
