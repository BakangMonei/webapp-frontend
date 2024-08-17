// App.js

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
	{
		id: '0',
		message: 'Hello Hii!',
		trigger: '1',
	}, 
	{
		id: '1',
		message: 'Please write your username',
		trigger: '2'
	}, 
	{
		id: '2',
		user: true,
		trigger: '3',
	}, 
	{
		id: '3',
		message: "Hi {previousValue}, how can I help you?",
		trigger: '4'
	}, 
	{
		id: '4',
		options: [
			{ value: 1, label: 'View Olympic News' },
			{ value: 2, label: 'Read Olympic Articles' },
		],
		end: true
	}
];

// Creating our own theme
const theme = {
	background: '#ffffff', // White background
	headerBgColor: '#000000', // Black header background color
	headerFontSize: '20px',
	botBubbleColor: '#0000ff', // Blue bot bubble color
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#000000', // Black user bubble color
	userFontColor: 'white',
};

// Set some properties of the bot
const config = {
	botAvatar: "img.png",
	floating: true,
};

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ChatBot
					headerTitle="MoneiGPT"
					steps={steps}
					{...config}
				/>
			</ThemeProvider>
		</div>
	);
}

export default App;
