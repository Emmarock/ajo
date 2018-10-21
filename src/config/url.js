const env = process.env.NODE_ENV;

//export const baseURL = 'https://esusu-api.herokuapp.com/api/v1';
export const baseURL = 'http://localhost:8080/api/v1';
//----AUTH MANAGEMENT URLS---//

export const postIssue = baseURL + '/contributor/';
export const postContributor = baseURL + '/contributor/';
export const getIssues = baseURL + '/contributor/';
export const getAllContributor = baseURL+'/contributor';
export const getOneIssue = (id)=>baseURL + '/contributor/' + id;



