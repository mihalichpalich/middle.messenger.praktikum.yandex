import {chatApi} from "../../api";
import {Dispatch} from "../../core/Store";
import {apiHasError} from "../../utils";
import {ChatMessagePayload} from "../../api/chat/types";
import {WS} from "../../core";

export async function getChatList(dispatch: Dispatch<AppState>, _: AppState) {
  const response = await chatApi.getChatList();

  if (!apiHasError(response)) {
    const chatList = response.map((chat) => ({
      id: chat.id,
      title: chat.title,
      chatAvatar: `${process.env.IMG_ENDPOINT}${chat.avatar || chat.last_message?.user.avatar || ''}`,
      unreadCount: chat.unread_count,
      time: chat.last_message?.time || '',
      text: chat.last_message?.content || ''
    }));

    dispatch({chatList});
  }
}

export async function getChatUsers(dispatch: Dispatch<AppState>, _: AppState, action: number | string) {
  const response = await chatApi.getChatUsers(action);

  if (!apiHasError(response)) {
    const chatUsers = response.map((user) => user.display_name || `${user.first_name} ${user.second_name}`);

    dispatch({chatUsers});
  }
}

export async function getChatToken(dispatch: Dispatch<AppState>, state: AppState, action: number | string) {
  const response = await chatApi.getChatToken(action);

  if (!apiHasError(response)) {
    const chatToken = response.token;
    const socket = new WS();
    const userId = state.user?.id;
    const chatId = action;
    socket.close();
    socket.getMessages(`/${userId}/${chatId}/${chatToken}`, getMessages);
  }

  function getMessages(data: MessageEvent["data"]) {
    let chatMessages;

    if (Array.isArray(data)) {
      chatMessages = data.map((message: ChatMessagePayload) => ({
        userId: message.user_id,
        time: message.time,
        text: message.content
      })).reverse();
      localStorage.setItem('messages', JSON.stringify(chatMessages));
    } else {
      const messages = localStorage.getItem('messages');
      const messagesArr = JSON.parse(messages as string);
      chatMessages = [...messagesArr, {userId: data.user_id, time: data.time, text: data.content}]
      localStorage.setItem('messages', JSON.stringify(chatMessages));
    }

    dispatch({chatMessages});
  }
}

export async function addChat(dispatch: Dispatch<AppState>, _: AppState, action: string) {
  const response = await chatApi.addChat({title: action});

  if (!apiHasError(response)) {
    dispatch(getChatList);
  }
}

export async function userSearch(dispatch: Dispatch<AppState>, _: AppState, action: string) {
  const response = await chatApi.userSearch({login: action});

  if (apiHasError(response)) {
    return;
  }

  dispatch(addUser, response[0].id)
}

async function addUser(dispatch: Dispatch<AppState>, state: AppState, action: number) {
  const response = await chatApi.addUser({chatId: state.chatId as number, users: [action]});

  if (!apiHasError(response)) {
    dispatch(getChatUsers, state.chatId);
  }
}

export async function removeUser(dispatch: Dispatch<AppState>, state: AppState, action: number) {
  const response = await chatApi.deleteUser({chatId: state.chatId as number, users: [action]});

  if (!apiHasError(response)) {
    dispatch(getChatUsers, state.chatId);
  }
}
