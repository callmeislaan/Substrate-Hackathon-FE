export type Notification = {
  id?: string;
  title: string;
  content: string;
  requestId: string;
  created: number;
  type: string;
  read?: boolean;
};

export type Notifications = Notification[];

export type ChatNofication = {
  currentMentor: string;
  lastMessage: {
    content: string | null;
    from: string | null;
    fromFullName: string | null;
    read: boolean | null;
    timestamp: number;
  };
};

export type ChatNofications = ChatNofication[];
