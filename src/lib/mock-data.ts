const users = ["Felipe Ribeiro", "Enzo Koji", "Yuri Nichimura"]

const currentUser = {
  name: "Felipe Ribeiro",
  avatar: "/placeholder-user.jpg",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  following: 120,
  followers: 85,
  classes: [
    "Compiladores",
    "Computação Distribuída",
    "Interação Humano-Computador",
    "Engenharia de Software",
    "Metodologia de Pesquisa em Computação",
    "Projetos Empreendedores",
    "Teoria dos Grafos"
  ]
}

const newUsers = [
  {
    id: 1,
    name: "Felipe Ribeiro",
    avatar: "/placeholder-user.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    following: 120,
    followers: 85,
    classes: [
      "Compiladores",
      "Computação Distribuída",
      "Interação Humano-Computador",
      "Engenharia de Software",
      "Metodologia de Pesquisa em Computação",
      "Projetos Empreendedores",
      "Teoria dos Grafos"
    ]
  },
  {
    id: 2,
    name: "Enzo Koji",
    avatar: "/placeholder-user.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    following: 120,
    followers: 1200,
    classes: [
      "Compiladores",
      "Computação Distribuída",
      "Interação Humano-Computador",
      "Engenharia de Software",
      "Metodologia de Pesquisa em Computação",
      "Projetos Empreendedores",
      "Teoria dos Grafos"
    ]
  },
  {
    id: 3,
    name: "Yuri Nichimura",
    avatar: "/placeholder-user.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    following: 120,
    followers: 85,
    classes: [
      "Compiladores",
      "Computação Distribuída",
      "Interação Humano-Computador",
      "Engenharia de Software",
      "Metodologia de Pesquisa em Computação",
      "Projetos Empreendedores",
      "Teoria dos Grafos"
    ]
  },
]

const communities = [
  "Compiladores",
  "Computação Distribuída",
  "Interação Humano-Computador",
  "Engenharia de Software",
  "Metodologia de Pesquisa em Computação",
  "Projetos Empreendedores",
  "Teoria dos Grafos"
]
const posts = [
  {
    id: 1,
    author: users[0],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[0],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[1],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
  {
    id: 2,
    author: users[1],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[1],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
      {
        author: users[0],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
  {
    id: 3,
    author: users[2],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[2],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[1],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      }
    ]
  },
  {
    id: 4,
    author: users[0],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[3],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      }
    ]
  },
  {
    id: 5,
    author: users[1],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[4],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
  {
    id: 6,
    author: users[2],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[5],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[1],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
  {
    id: 7,
    author: users[0],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[6],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
  {
    id: 8,
    author: users[0],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[0],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
  {
    id: 9,
    author: users[0],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[1],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
  {
    id: 10,
    author: users[0],
    authorAvatar: "/placeholder-user.jpg",
    community: communities[3],
    time: "0h atrás",
    content: "teste",
    link: null,
    likes: 20,
    comments: [
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
      {
        author: users[2],
        authorAvatar: "/placeholder-user.jpg",
        content: "teste"
      },
    ]
  },
]

export { users, currentUser, communities, posts }