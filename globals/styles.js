import {StyleSheet} from 'react-native';
export const globalStyles=StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#ffffff',
        justifyContent: 'center',
        //alignItems: 'center'
    },
    scrollContainer:{
      backgroundColor:'#ffffff',
      //alignItems: 'center'
  },
    titleText:{
        //fontFamily:'nunito-bold',
        fontSize:30,
        color:'#333'
    },
    // paragraph:{
    //     margninVerticle:8,
    //     lineHeight:20
    // }
   button: {
        alignItems: 'center',
        backgroundColor: '#00BCD4',
        color: '#ffffff',
        padding: 5,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10
        },
     text: {
        color: '#ffffff',
        fontSize: 5,
        },
    textLocation: {
          color: '#ffffff',
          fontSize: 5,
          },
    textMovement: {
          color: 'black',
          fontSize: 15,
          },
    textHome:{
        color: '#080808',
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        alignSelf: 'stretch',
        
    } ,   
    buttonList: {
            alignItems: 'flex-start',
            color: '#080808',
            padding: 5,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            borderRadius:10
            },
      
    text: {
            color: '#080808',
            fontSize: 15,
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            }, 
    textlabel: {
                color: '#111825',
                fontSize: 15,
                marginTop: 2,
                marginLeft: 10,
                marginRight: 10,
                width: 100, 
                //backgroundColor: 'powderblue'
                }, 
    textvalue: {
                color: '#111825',
                fontSize: 15,
                marginTop: 2,
                marginLeft: 10,
                marginRight: 10,
                flex: 1, 
                flexWrap: 'wrap'
                //backgroundColor: 'powderblue'
                }, 
    ticket_row:{
                flex: 0.3,
                backgroundColor: "beige",
                borderWidth: 1,
                color: '#080808',
                } ,
    textInput:{
          height: 40, 
          borderColor: 'gray',
          borderWidth: 1 ,
          marginLeft: 10,
          marginRight: 10,
          borderRadius:10,
          marginTop:5,
          padding:10
    },
    textArea:{
      height: 70, 
      borderColor: 'gray',
      borderWidth: 1 ,
      marginLeft: 10,
      marginRight: 10,
      borderRadius:10,
      marginTop:5,
      padding:10,
      textAlignVertical: 'top'
},
    textAccount:{
      color: '#111825',
      fontSize: 15,
      marginTop: 2,
      marginLeft: 10,
      marginRight: 10,
      width: 80, 
 }, 
  textAccountLabel:{
  color: '#111825',
  fontSize: 15,
  marginTop: 2,
  marginLeft: 10,
  marginRight: 10,
},
    appBar: {
        backgroundColor : "teal"
     },
     
   image: {
          width: 60, 
          height: 60,
          alignItems: "center",
        },
    qr:{
        paddingTop: 30, 
        alignItems: "center",
    },
    body:{
        backgroundColor: "#ffffff",
    },
  buttonText:{
     color:"#080808"
  },
 autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
  ,
  container_auto: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
 });