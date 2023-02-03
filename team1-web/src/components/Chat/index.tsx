import { useApiData, useApiGetChats } from '../../lib/api';
import { ChatInfo, TimeObjectEx } from '../../lib/types';
import { RootState, useAppSelector } from '../../store';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// import { TimeObjectEx } from '../../lib/types'
// import { io } from 'socket.io-client';

// import SockJS from 'sockjs-client';
// import StompJs from 'stompjs';
// import Stomp from '@stomp/stompjs';


// npm i  @types/sockjs-client
// npm i @types/stompjs
// npm i socket.io-client

interface ChatObj {
    chatId: number;
    contents: string;
    messageId: number;
    received: boolean;
    sentAt: TimeObjectEx;
    type: String;
}

function ChatItem( { chat }: { chat: ChatInfo }) {
    return (
        <section className={styles['chat']}>
            <h1 className={styles['board-title']}>
                <Link to={`${chat.id}`}>{chat.target}</Link>
            </h1>
        </section>
    );
}


export default function Chat() {
    const token = useAppSelector((state: RootState) => state.session.token);
    const chatList = useApiData(useApiGetChats(token, 0));
    console.log("chatlist: ", chatList);
    console.log("token: ", token);

    useEffect(()=> {
        // localhost -> api.wafflytime.com
        var authToken = "Bearer " + token;
        var socket = new WebSocket('ws://localhost:8080/api/ws-connect?token=' + authToken);

        socket.onopen = function() {
            console.log("ws opened!!.");
        };
        socket.onerror = (err) => {
              console.log("web socket open failed: ", err);
        };
        
        socket.onclose = (msg) => {
            console.log("close socket " + msg);
        };

        socket.onmessage = (e) => {
            const data: ChatObj = JSON.parse(e.data);
            const chatId = data.chatId;

            console.log(data);
            console.log(chatId);
        }

    }, []);
    
    return (
        <article className={styles['chat-body']}>
            <article className={styles['chats']}>
                {chatList?.contents.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} />
                ))}
            </article>
        </article>
    )
}