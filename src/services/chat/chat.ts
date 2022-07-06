import {ChatApi} from "../../api";
import {apiHasError, getAvatarImage} from "../../utils";
import {ChatMessagePayload} from "../../api/chat/types";
import {WS} from "../../core";

export async function getChatList(dispatch: Dispatch<AppState>, _: AppState) {
  try {
    const response = await ChatApi.getChatList();

    if (!apiHasError(response)) {
      const chatList = response.map((chat) => ({
        id: chat.id,
        title: chat.title,
        chatAvatar: getAvatarImage(chat.avatar || chat.last_message?.user.avatar || null),
        unreadCount: chat.unread_count,
        time: chat.last_message?.time || '',
        text: chat.last_message?.content || ''
      }));

      dispatch({chatList});
    }
  } catch (e) {
    throw e;
  }
}

export async function getChatData(dispatch: Dispatch<AppState>, _: AppState, chatId: string) {
  try {
    dispatch({chatId: Number(chatId)});
    dispatch(getChatUsers, chatId);
    dispatch(getChatToken, chatId);
  } catch (e) {
    throw e;
  }
}

export async function getChatUsers(dispatch: Dispatch<AppState>, _: AppState, chatId: string) {
  try {
    const response = await ChatApi.getChatUsers(chatId);

    if (!apiHasError(response)) {
      const chatUsers = response.map((user) => user.display_name || `${user.first_name} ${user.second_name}`);

      dispatch({chatUsers});
    }
  } catch (e) {
    throw e;
  }
}

export async function getChatToken(dispatch: Dispatch<AppState>, state: AppState, chatId: string) {
  try {
    const response = await ChatApi.getChatToken(chatId);

    if (!apiHasError(response)) {
      const chatToken = response.token;
      const socket = new WS();
      const userId = state.user?.id;
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
      dispatch({isChatListLoading: false});
    }
  } catch (e) {
    throw e;
  }
}

export async function addChat(dispatch: Dispatch<AppState>, _: AppState, title: string) {
  try {
    const response = await ChatApi.addChat({title});

    if (!apiHasError(response)) {
      dispatch(getChatList);
      dispatch({isAddChatFormOpened: false});
    }
  } catch (e) {
    throw e;
  }
}

export async function userSearch(dispatch: Dispatch<AppState>, _: AppState, login: string) {
  try {
    const response = await ChatApi.userSearch({login});

    if (apiHasError(response)) {
      return;
    }

    const userId = response[0]?.id;

    dispatch(addUser, userId);
  } catch (e) {
    throw e;
  }
}

async function addUser(dispatch: Dispatch<AppState>, state: AppState, userId: number) {
  try {
    const response = await ChatApi.addUser({chatId: state.chatId as number, users: [userId]});

    if (!apiHasError(response)) {
      dispatch(getChatUsers, state.chatId);
    }
  } catch (e) {
    throw e;
  }
}

export async function removeUser(dispatch: Dispatch<AppState>, state: AppState, userId: number) {
  try {
    const response = await ChatApi.deleteUser({chatId: state.chatId as number, users: [userId]});

    if (!apiHasError(response)) {
      dispatch(getChatUsers, state.chatId);
    }
  } catch (e) {
    throw e;
  }
}
