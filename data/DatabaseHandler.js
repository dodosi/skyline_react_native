import React, { useState } from "react";
import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';
 var data;
function setData(data1){
   data=data1;
  // console.log(data)
}


export const db = SQLite.openDatabase("db.db");

export function getDataBy(id){
  db.transaction(tx=>{
    tx.executeSql(
                  "select * from account", 
                  [], 
                (_, { rows }) =>{
                  //console.log(rows)
                  console.log(rows._array[0])
                  setData(rows._array[0])
                }
           )
      },
    null,
   // update
  );
  return  data; 
}

export function createTable(){
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists account (id integer primary key not null, firstname text,lastname text,phone text,email text);"
    );
    console.log("Table Created!!");
  });
}
export function updateAccount(firstname,lastname,phone,email){
  createTable();
  deleteData();
  db.transaction(
    tx=>{
      tx.executeSql('update account set firstname=?,lastname=?,phone=?,email=?',[firstname,lastname,phone,email]);
      
    },
     (t, error) => { console.log("db error insertUser"); console.log(error);  },
     (t, success) => { console.log("DONE")}
  );
}
export function registerAccount(firstname,lastname,phone,email){
  createTable();
  deleteData();
   db.transaction(
    tx=>{
      tx.executeSql('insert into account(firstname,lastname,phone,email) values(?,?,?,?)',[firstname,lastname,phone,email]);
      
    },
     (t, error) => { console.log("db error insertUser");   console.log(error);  },
     (t, success) => { console.log("DONE")}
  );
}
export function deleteData(){
  console.log("STart delete");
  db.transaction(tx=>{
     tx.executeSql(`delete  from account`,[]);
     tx.executeSql("select * from account", [], (_, { rows }) =>{
        console.log(JSON.stringify(rows));
        console.log("Data Deleted!!!");
      }
        );
   })
}