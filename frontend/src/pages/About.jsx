import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import historyImg from "../assets/history.jpg";
import missionImg from "../assets/mission.jpg";
import valuesImg from "../assets/values.jpg";
import teamImg from "../assets/team.jpg";

// Styled components using basic CSS-in-JS
const AboutPageWrapper = styled('div')({
  position: 'relative',
  overflow: 'hidden',
});

const BackgroundOverlay = styled('div')({
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.1,
  backgroundImage: `url('/images/hotel-background.jpg')`,
});

const ContentWrapper = styled('div')({
  position: 'relative',
  maxWidth: '100%',
  margin: '8rem auto 0 auto',
  padding: '0 1rem',
  textAlign: 'center',
  '& > section': {
    marginBottom: '12.5rem',
  },
});

const IntroSection = styled('div')({
  marginBottom: '12.5rem',
});

const SectionTitle = styled('h2')({
  fontSize: '3.5rem',
  fontWeight: 'bold',
  color: '#0066cc', // Directly using hex code
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  '@media (max-width: 768px)': { // Mimicking theme.breakpoints.down('md')
    fontSize: '3rem',
  },
});



const IntroText = styled('h3')({
  fontSize: '1.5rem',
  fontStyle: 'italic',
  color: '#6b7280', // Directly using hex code
  marginTop: '1rem',
});

const DescriptionText = styled('p')({
  fontSize: '1rem',
  color: '#6b7280',  // Directly using hex code
  maxWidth: '768px',
  margin: '1rem auto',
  lineHeight: 1.7,
});

const HistorySection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 768px)': { // Mimicking theme.breakpoints.up('md')
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > div': {
      width: '45%',
    },
  },
  gap: '4rem', //  Using rem value
});

const HistoryImage = styled('div')({
  height: '16rem',
  borderRadius: '1rem',
  objectFit: 'cover',
  width: '100%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)', //  basic box-shadow
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const HistoryText = styled('div')({
  textAlign: 'left',
  '& h3': {
    marginBottom: '1rem',
  },
});

const SectionHeader = styled('h3')({
  fontSize: '2rem',
  fontWeight: 'semibold',
  color: '#0066cc',  // Directly using hex code
});

const CallToAction = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 2.5rem',
  borderRadius: '2rem',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  letterSpacing: '0.025em',
  backgroundColor: '#ff9900', // Directly using hex code
  color: '#f0f4f8',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#d4a373',
    color: '#f0f4f8',
    transform: 'scale(1.08)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
});

function About() {
  return (
    <AboutPageWrapper>
      <BackgroundOverlay />
      <ContentWrapper>
        <IntroSection>
          <SectionTitle>
            About Grand Horizon
          </SectionTitle>

          <IntroText>
            Where Tradition Meets Modern Luxury
          </IntroText>
          <DescriptionText>
            At Grand Horizon, we pride ourselves on delivering exceptional hospitality and
            creating unforgettable experiences. With a rich history and an unwavering
            commitment to excellence, we invite you to discover the true meaning of luxury.
          </DescriptionText>
        </IntroSection>

        <section>
          <HistorySection>
            <HistoryText>
              <SectionHeader>Our History</SectionHeader>
              <DescriptionText>
                Established in 1995, Grand Horizon has been a beacon of elegance and sophistication,
                hosting guests from across the globe in a sanctuary of comfort and grace.
              </DescriptionText>
            </HistoryText>
            <HistoryImage style={{ backgroundImage: `url(${historyImg})` }} />
          </HistorySection>

          <HistorySection >
            <HistoryImage style={{ backgroundImage: `url(${missionImg})` }}/>
            <HistoryText>
              <SectionHeader>Our Mission</SectionHeader>
              <DescriptionText>
                Our mission is to redefine luxury hospitality by offering heartfelt service
                and unforgettable moments, ensuring every guest feels deeply valued and cherished.
              </DescriptionText>
            </HistoryText>
          </HistorySection>

          <HistorySection>
            <HistoryText>
              <SectionHeader>Our Values</SectionHeader>
              <DescriptionText>
                Excellence, sustainability, and inclusivity are the heart of everything we do —
                from eco-conscious initiatives to creating personalized experiences for every guest.
              </DescriptionText>
            </HistoryText>
            <HistoryImage style={{ backgroundImage: `url(${valuesImg})` }}/>
          </HistorySection>

          <HistorySection >
            <HistoryImage style={{ backgroundImage: `url(${teamImg})` }}/>
            <HistoryText>
              <SectionHeader>Our Team</SectionHeader>
              <DescriptionText>
                A passionate ensemble of experts, dedicated to crafting moments of joy,
                comfort, and distinction — ensuring your stay is simply extraordinary.
              </DescriptionText>
            </HistoryText>
          </HistorySection>
        </section>

        <div className="mt-16">
          <CallToAction to="/services" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Discover Our Services
          </CallToAction>
        </div>
      </ContentWrapper>
    </AboutPageWrapper>
  );
}

export default About;
