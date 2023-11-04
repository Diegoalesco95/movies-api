import { ObjectId } from 'mongodb';

const moviesMock = [
  {
    id: new ObjectId(),
    title: 'Logorama',
    year: 2040,
    cover: 'https://dummyimage.com/110x206.bmp/5fa2dd/ffffff',
    description:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    duration: 132,
    contentRating: 'PG',
    source: 'www.google.com',
    tag: ['Comedy', 'Drama'],
  },
  {
    id: new ObjectId(),
    title: 'Messiah of Evil',
    year: 2021,
    cover: 'https://dummyimage.com/186x155.bmp/cc0000/ffffff',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    duration: 237,
    contentRating: 'NC-17',
    source: 'www.google.com',
    tag: ['Crime|Film-Noir|Mystery|Thriller'],
  },
  {
    id: new ObjectId(),
    title: 'River, The (He liu)',
    year: 2009,
    cover: 'https://dummyimage.com/160x186.bmp/5fa2dd/ffffff',
    description:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    duration: 179,
    contentRating: 'R',
    source: 'www.google.com',
    tag: ['Documentary|Sci-Fi', 'Adventure|Romance', 'Drama', 'Adventure|Romance|Western', 'Documentary'],
  },
  {
    id: new ObjectId(),
    title: "Bells of St. Mary's, The",
    year: 2033,
    cover: 'https://dummyimage.com/117x236.png/cc0000/ffffff',
    description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    duration: 280,
    contentRating: 'PG-13',
    source: 'www.google.com',
    tag: ['Comedy|Crime', 'Drama', 'Comedy|Drama', 'Comedy|Drama'],
  },
  {
    id: new ObjectId(),
    title: 'Death Takes a Holiday',
    year: 1964,
    cover: 'https://dummyimage.com/109x175.png/ff4444/ffffff',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    duration: 237,
    contentRating: 'NC-17',
    source: 'www.google.com',
    tag: ['Comedy|Drama', 'Horror', 'Children|Comedy'],
  },
  {
    id: new ObjectId(),
    title: 'I Origins',
    year: 1969,
    cover: 'https://dummyimage.com/150x121.jpg/cc0000/ffffff',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    duration: 75,
    contentRating: 'PG-13',
    source: 'www.google.com',
    tag: ['Drama|Romance|Thriller', 'Drama'],
  },
  {
    id: new ObjectId(),
    title: 'Ringu (Ring)',
    year: 2040,
    cover: 'https://dummyimage.com/170x147.bmp/cc0000/ffffff',
    description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    duration: 145,
    contentRating: 'PG-13',
    source: 'www.google.com',
    tag: ['Drama|Thriller', 'Action|Crime|Drama'],
  },
  {
    id: new ObjectId(),
    title: 'Heli',
    year: 1981,
    cover: 'https://dummyimage.com/219x193.png/cc0000/ffffff',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    duration: 21,
    contentRating: 'G',
    source: 'www.google.com',
    tag: ['Children|Comedy', 'Drama|Romance', 'Drama', 'Comedy|Drama|Musical', 'Drama'],
  },
  {
    id: new ObjectId(),
    title: 'Teacher, A',
    year: 1904,
    cover: 'https://dummyimage.com/135x209.bmp/5fa2dd/ffffff',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    duration: 131,
    contentRating: 'PG-13',
    source: 'www.google.com',
    tag: ['Drama|Romance', 'Crime|Drama|Thriller', 'Drama'],
  },
  {
    id: new ObjectId(),
    title: 'Phantom Lover, The (Ye ban ge sheng)',
    year: 1981,
    cover: 'https://dummyimage.com/193x180.png/dddddd/000000',
    description: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    duration: 250,
    contentRating: 'PG-13',
    source: 'www.google.com',
    tag: ['Crime|Drama', 'Documentary', 'Thriller', '(no genres listed)'],
  },
];

function filteredMoviesMock(tag: string) {
  return moviesMock.filter((movie) => movie.tag.includes(tag));
}

class MoviesServiceMock {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

export { moviesMock, filteredMoviesMock, MoviesServiceMock };
