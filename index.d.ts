interface Card {
  id: string;
  text: string;
  stars: {
    [sessionId: string]: number;
  };
  starsCount: number;
  ownerId: string;
}

interface Column {
  name: string;
  id: string;
  cards: Card[];
}

interface Board {
  title: string;
  description: string;
  showResults: boolean;
  columns: Column[];
}

interface BoardColumn {
  id: string;
  name: string;
  isEditing: boolean;
}

interface Session {
  id: string;
  remainingStars: {
    [boardId: string]: number;
  }
}
