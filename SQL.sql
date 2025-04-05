CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);
CREATE TABLE public.books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  published_year INT,
  quantity INT NOT NULL DEFAULT 0
);

	CREATE TABLE public.borrowing_history (
  borrowing_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES public.users(id),
  book_id INT REFERENCES public.books(id),
  borrowed_date DATE NOT NULL,
  returned_date DATE,
  FOREIGN KEY (user_id) REFERENCES public.users(id),
  FOREIGN KEY (book_id) REFERENCES public.books(id)
);
SELECT * FROM books WHERE id = 1;
SELECT * FROM public.users;
SELECT * FROM public.books;
SELECT * FROM public.borrowing_history;

SELECT * FROM users WHERE password = '$2b$10$sWOWCRKIDznUsVY7eOWEP.lTXgTPp/i3uPCvFhaXPTyMH76fJkr2m';

ALTER USER postgres WITH PASSWORD '28112004';

