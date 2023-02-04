import { useEffect, useLayoutEffect, useState } from 'react';
import { useApiData, useApiGetChats, useApiGetMessages } from '../../../lib/api';
import { Message, Room } from '../../../lib/types';
import { RootState, useAppDispatch, useAppSelector } from '../../../store';
import { setChats, setSelectedChatId } from '../../../store/boardSlice';
import styles from './index.module.scss';

export default function Chat() {
  const token = useAppSelector((state: RootState) => state.session.token);
  const chatId = useAppSelector((state: RootState) => state.board.selectedChatId);
  const chats = useAppSelector((state: RootState) => state.board.chats);
  const currentChatsFunc = useApiGetChats(token);
  const currentMessagesFunc = useApiGetMessages(token, chatId ? chatId : undefined);

  const dispatch = useAppDispatch();

  const webSocketUrl = `ws://api.wafflytime.com/api/ws-connect?token=${token}`;

  const [currentMessage, setCurrentMessage] = useState('');
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  useLayoutEffect(() => {
    setWebSocket(new WebSocket(webSocketUrl));
  }, []);
  useLayoutEffect(() => {
    currentChatsFunc().then((res) => {
      console.log(res.data);
      dispatch(
        setChats(
          res.data.contents.map((room: Room) => {
            return { room: room, messages: [], id: room.id };
          })
        )
      );
    });
  }, [currentChatsFunc]);
  useLayoutEffect(() => {
    console.log(chats);
    if (chats.length > 0 && chats.filter((chat) => chat.id === chatId).length > 0) {
      console.log(chats.filter((chat) => chat.id === chatId));
      setLoading(false);
    } else {
      currentMessagesFunc().then((res) => {
        setResult(res);
      });
    }
  }, [chats]);
  useLayoutEffect(() => {
    if (result) {
      dispatch(
        setChats(
          chats.map((chat) => {
            console.log(chat.id, chatId);
            if (chat.id === chatId) {
              console.log('found');
              console.log({ room: chat.room, messages: result.data.contents, id: chat.id });
              return { room: chat.room, messages: result.data.contents, id: chat.id };
            } else {
              return chat;
            }
          })
        )
      );
    }
  }, [result]);
  useLayoutEffect(() => {
    if (webSocket) {
      webSocket.onopen = () => {
        console.log('Success');
      };
      webSocket.onerror = (err) => {
        console.log(err);
      };
      webSocket.onmessage = (evt: MessageEvent) => {
        const data = JSON.parse(evt.data);
        switch (data.type) {
          case 'MESSAGE':
            console.log(chats);
            const newChats = chats.map((chat) => {
              if (chat.id === chatId) {
                console.log({
                  id: chat.id,
                  room: chat.room,
                  messages: [
                    ...chat.messages,
                    {
                      id: data.id,
                      sentAt: data.sentAt,
                      received: data.received,
                      contents: data.contents,
                    },
                  ],
                });
                return {
                  id: chat.id,
                  room: chat.room,
                  messages: [
                    ...chat.messages,
                    {
                      id: data.id,
                      sentAt: data.sentAt,
                      received: data.received,
                      contents: data.contents,
                    },
                  ],
                };
              } else return chat;
            });
            dispatch(setChats(newChats));
        }
      };
    }
  }, [chatId, dispatch, chats, webSocket]);
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (!webSocket) return;
      webSocket.send(
        JSON.stringify({
          chatId: chatId,
          contents: currentMessage,
        })
      );
      setCurrentMessage('');
    }
  };
  return !loading ? (
    <div className={styles['chat']}>
      <div className={styles['header']}>
        <div className={styles['headerText']}>
          {chats.length > 0 && chats.filter((chat) => chat.id === chatId).length > 0
            ? chats.filter((chat) => chat.id === chatId)[0].room.target
            : '(알 수 없음)'}
        </div>
        <div
          title='닫기'
          className={styles['close']}
          onClick={() => dispatch(setSelectedChatId(null))}
        ></div>
      </div>
      <div className={styles['messages']}>
        {(chats.length > 0 && chats.filter((chat) => chat.id === chatId).length > 0
          ? chats.filter((chat) => chat.id === chatId)[0].messages
          : []
        ).map((message: Message) => (
          <div className={message.received ? styles['messageBox'] : styles['messageBox-mine']}>
            <div className={styles['message']}>{message.contents}</div>
          </div>
        ))}
      </div>
      <div className={styles['inputPanel']}>
        <input
          placeholder='Aa'
          className={styles['input']}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          value={currentMessage}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
