import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class authService {

    apiUrl = 'http://3.16.137.69:8000/api/';

    constructor(private http: HttpClient) {
    }

    getRequest(url) {
        return this.http.get(this.apiUrl + url);
    }

    postRequest(url, data) {
        return this.http.post(this.apiUrl + url, data);
    }

    memberSignIn(memberValue) {
        return this.http.post(this.apiUrl + 'memberData/', memberValue);
    }

    memberRegistration(memberValue) {
        return this.http.post(this.apiUrl + 'registerMember/', memberValue);
    }

    memberData(memberValue) {
        return this.http.post(this.apiUrl + 'memberData/', memberValue);
    }

    memberAddOfferTransaction(inputData) {
        return this.http.post(this.apiUrl + 'addOfferTransactions/', inputData);
    }

    memberEarnPoints(inputData) {
        return this.http.post(this.apiUrl + 'earnPoints/', inputData);
    }

    memberRewardsPonts(inputData) {
        return this.http.post(this.apiUrl + 'addRewardTransactions/', inputData);
    }

    memberUseRewardPoints(inputData) {
        return this.http.post(this.apiUrl + 'usePoints/', inputData);
    }

    partnerSignIn(partnerValue) {
        return this.http.post(this.apiUrl + 'partnerData/', partnerValue);
    }

    partnerRegistration(partnerValue) {
        return this.http.post(this.apiUrl + 'registerPartner/', partnerValue);
    }

    partnerData(partnerValue) {
        return this.http.post(this.apiUrl + 'partnerData/', partnerValue);
    }
}
