import { Helmet } from 'react-helmet-async'

function MetaTagsComponent({ project }) {
    const title = project?.title || 'Opportune Project'
    const description =
        project?.description || 'Check out this awesome project on Opportune'
    const imageUrl =
        project?.thumbnailUrl ||
        `${window.location.origin}/default-project-thumbnail.jpg`
    const projectUrl = project
        ? `${window.location.origin}/${project.authorDetails.username}/${project.slug}`
        : window.location.href

    return (
        <Helmet>
            {/* Basic SEO Meta Tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta
                name='keywords'
                content='projects, portfolio, showcase, tech, UI, UX, development'
            />
            <meta
                name='author'
                content={project?.authorDetails?.name || 'Opportune User'}
            />
            <meta name='robots' content='index, follow' />

            {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
            <meta property='og:type' content='website' />
            <meta property='og:url' content={projectUrl} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:image' content={imageUrl} />
            <meta property='og:image:alt' content={title} />
            <meta property='og:site_name' content='Opportune' />

            {/* Twitter Meta Tags */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:url' content={projectUrl} />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content={imageUrl} />
            <meta name='twitter:image:alt' content={title} />

            {/* LinkedIn Specific */}
            <meta property='og:image:width' content='1200' />
            <meta property='og:image:height' content='630' />

            {/* WhatsApp & General Platforms */}
            <meta property='og:locale' content='en_US' />
            <meta property='og:determiner' content='the' />

            {/* Favicon */}
            <link rel='icon' type='image/png' href='/favicon.ico' />
        </Helmet>
    )
}

export default MetaTagsComponent
