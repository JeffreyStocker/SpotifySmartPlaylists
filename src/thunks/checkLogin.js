import get from 'axios';

export default function checkLogin () {
  return get(`/user/${userID}`)
    .then(({data: {name, accessToken, smartPlaylists, id, accessTokenExpire}}) => {
      this.props.setUser({name, id, accessToken, accessTokenExpire});
      this.props.setAllPlaylists(smartPlaylists);
    })
}