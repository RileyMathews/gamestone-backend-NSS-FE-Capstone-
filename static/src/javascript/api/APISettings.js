/* 
    module to handle changing from local api to deployed api
    authors Riley Mathews
*/

// const url = "https://rm-midstone.herokuapp.com/"
// const url = "http://localhost:8000/api/"
// const url = "http://206.189.229.10/api/"
// const url = "http://ec2-54-144-250-201.compute-1.amazonaws.com/"
const url = process.env.GAMESTONE_API_URL
export default url
