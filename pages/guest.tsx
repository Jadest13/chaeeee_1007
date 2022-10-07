import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'

var imageNum = Math.floor(Math.random()*9)+1

function postMessages() {

  const message_text = document.querySelector<HTMLTextAreaElement>('#message_text')!.value;
  const name_text = document.querySelector<HTMLTextAreaElement>('#name_text')!.value;

  if(name_text == "") {
    alert("이름을 입력해주세요.");
    return;
  }

  if(message_text == "") {
    alert("메시지를 입력해주세요.");
    return;
  }

  const reqBody = {
    msgtext: message_text,
    publisher: name_text,
    image: '/'+imageNum+'.png'
  }

  console.log(reqBody)

  fetch('https://chaeeee1007.vercel.app/api/db', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type' : 'application/json',
    },
  })
  .then(res => res.json)
  .then(data => console.log(data));
  
  document.querySelector<HTMLTextAreaElement>('#message_text')!.value = "";
  
  location.reload();
}

function getRandomColor() {
  var rand = Math.floor(Math.random()*7);
  if(rand == 0) return styles.red;
  else if(rand==1) return styles.orange;
  else if(rand==2) return styles.yellow;
  else if(rand==3) return styles.green;
  else if(rand==4) return styles.cyan;
  else if(rand==5) return styles.blue;
  else if(rand==6) return styles.magenta;
}

function selectImageBut() {
  console.log(document.querySelector('#settingBut')!.classList);
  if(!document.querySelector('#settingBut')!.classList.contains(styles.active)) {
    document.querySelector('#Image'+imageNum)!.classList.add(styles.selected);
    document.querySelector('#settingBut')!.classList.add(styles.active);
    document.querySelector('#selectImageDiv')!.classList.add(styles.active);
  } else {
    document.querySelector('#settingBut')!.classList.remove(styles.active);
    document.querySelector('#selectImageDiv')!.classList.remove(styles.active);
  }
}

export async function getStaticProps() {

  const res = await fetch('http://localhost:3000/api/db')
  const result = await res.json()

  if(!result) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      result,
    },

    revalidate: 10,
  }
}

interface msg {msgid: number, msgtext: string, publisher: string, image: string, timedate: string};
type resType = {
  result: [{
    msgid: number,
    msgtext: string,
    publisher: string,
    image: string,
    timedate: string,
  }],
}

function Home({result}:resType) {

  var msgList:msg[] = [];
  console.log(result);
  var idx = 1;

  Array.from(result).forEach(function (value: any) {
    const nextMsg: msg = {
      msgid: idx,
      msgtext: value.msgtext,
      publisher : value.publisher,
      image : value.image,
      timedate : value.timedate,
    }
    msgList.push(nextMsg);

    idx++;
  }) 

  const msgView = msgList.map(msg =>
    <div key={msg.msgid}>
      <img src={msg.image} className={styles.heart}></img>
      <div>
        <div>
          <h2>{msg.publisher}</h2>
          <a>{msg.timedate.substr(0, 5)}</a>
        </div>
        <a>{msg.msgtext}</a>
      </div>
    </div>
  );
  
  let arr = new Array
  for(var i = 1; i <= 9; i++) {
    arr.push(i);
  }

  const imageList = arr.map(i => 
    <img key={i} src={'/' + i + '.png'} id={'Image'+i} className={styles.imageElement} onClick={() =>{
      for(var j = 1; j <= 9; j++) {
        if(document.querySelector('#Image'+j)!.classList.contains(styles.selected)) {
          document.querySelector('#Image'+j)!.classList.remove(styles.selected);
        }
        if(j == i) {
          document.querySelector('#Image'+j)!.classList.add(styles.selected);
          imageNum = j;
        }
      }
    }}></img>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>방명록💌</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/chaeeee.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.chat}>
          <a></a>
          {msgView}
        </div>
        <div className={styles.top_bar}>
          <Link href = "/">
            <img src="/left-arrow.png"></img>
          </Link>
          <img src="/chaeeee.png"></img>
          <p>채연아 태어나줘서 고마워~</p>
          <a></a>
          <textarea placeholder='이름' id="name_text"></textarea>
        </div>
        <div className={styles.bottom_bar}>
          <div className={styles.selectImage} id='selectImageDiv'>
            {imageList}
          </div>
          <div>
            <img id='settingBut' src='/setting.png' className={styles.setting} onClick={selectImageBut}></img>
            <div>
              <textarea placeholder='메시지 입력..' className={styles.textArea} id='message_text'></textarea>
              <img src="/send.png" onClick={postMessages}></img>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default React.memo(Home)
