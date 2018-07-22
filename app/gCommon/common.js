import {
   Dimensions,
} from 'react-native';

export const homeUrl = "http://192.168.158.1:8080/apollo";
let currentUser = "";

export function setCurrentUser(currentUser){
    this.currentUser = currentUser;
}

export function getCurrentUser(){
    return this.currentUser
}

var temp = Dimensions.get('window');

export var window = {
    width:temp.width,
    height:temp.height
}

// function getCurrentUser = () => {
//     var currentUser = ""
//     AsyncStorage.getItem("currentUser", function (err, result) {
//         if (err) {
//             alert(err);
//         } else {
//             currentUser = result;
//         }
//     });

// }