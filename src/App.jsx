import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UpcomingEvents from './UpcomingEvents';
import EventDetails from './EventDetails';
import Blog from './Blog';
import FAQ from './FAQ';
import Profile from './Profile';
import ErrorPage from './ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="upcoming-events" element={<UpcomingEvents />} />
        <Route path="event-details/:id" element={<EventDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;