const portfolioData = [
    {
        personalInfo: {
            name: 'Jenny Wilson',
            title: 'Full-Stack Developer',
            currentRole: 'currently designing at acme',
            location: 'Brooklyn, New York',
            timezone: 'GMT-5',
            email: 'hey@jenny.com',
            bio: 'As a digital designer, I specialize in creating unique visual identities for digital products. I believe that a catchy design starts with common values, open communication, and respect for your audience.',
        },
        social: [
            { name: 'linkedin', url: '#' },
            { name: 'dribbble', url: '#' },
            { name: 'behance', url: '#' },
            { name: 'twitter', url: '#' },
            { name: 'unsplash', url: '#' },
            { name: 'instagram', url: '#' },
        ],
        projects: [
            {
                title: 'weebe',
                description: 'marketing site design and build',
                longDescription:
                    'an 12 month long inquiry into italian design, history, and culture.',
                image: '/path-to-project-image.jpg',
            },
        ],
    },
]

export default portfolioData
