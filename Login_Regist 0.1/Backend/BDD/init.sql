-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,   -- changed: single type, increased length for hashed passwords
  foto_perfil TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 

-- ARTISTS
CREATE TABLE IF NOT EXISTS artists (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES users(id),
  nombre_artistico VARCHAR(100),
  genero VARCHAR(50),
  bio TEXT,
  verificado BOOLEAN DEFAULT FALSE
);

-- BANDS
CREATE TABLE IF NOT EXISTS bands (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  fecha_creacion DATE,
  estado VARCHAR(20)
);

-- BAND MEMBERS
CREATE TABLE IF NOT EXISTS band_members (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  band_id INT REFERENCES bands(id),
  artist_id INT REFERENCES artists(id),
  rol VARCHAR(50)
);

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(150),
  descripcion TEXT,
  fecha TIMESTAMP,
  ubicacion VARCHAR(150),
  latitud DECIMAL(9,6),
  longitud DECIMAL(9,6),
  es_pago BOOLEAN,
  link_compra TEXT
);

-- EVENT ARTISTS
CREATE TABLE IF NOT EXISTS event_artists (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id INT REFERENCES events(id),
  artist_id INT REFERENCES artists(id)
);

-- POSTS
CREATE TABLE IF NOT EXISTS posts (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_id INT REFERENCES users(id),   -- changed: reference to users
  contenido TEXT,
  tipo VARCHAR(20),
  link_externo TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COMMUNITIES
CREATE TABLE IF NOT EXISTS communities (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(100),
  tipo VARCHAR(50)
);

-- COMMUNITY POSTS
CREATE TABLE IF NOT EXISTS community_posts (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  community_id INT REFERENCES communities(id),
  post_id INT REFERENCES posts(id)
 
);

-- LIKES
CREATE TABLE IF NOT EXISTS likes (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id)
);

-- FAVORITES
CREATE TABLE IF NOT EXISTS favorites (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id)
);

-- FOLLOWS
CREATE TABLE IF NOT EXISTS follows (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES users(id),
  artist_id INT REFERENCES artists(id)
);

-- COMMENTS
CREATE TABLE IF NOT EXISTS comments (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id),
  contenido TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);