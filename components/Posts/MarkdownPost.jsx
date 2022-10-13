import { default as NextLink } from 'next/link'
import Image from 'next/image'
import { Grid, Text, Card } from '@geist-ui/react'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Meta = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const Hoverable = styled.div`
	> .card {
		border-radius: 13px;
	}
	.content {
		.thumbnail {
			border-radius: 13px 13px 0 0;
		}
	}
	&:hover {
		cursor: pointer;
	}
	width: 100%;
	display: flex;
`

const StyledCard = styled(Card)`
	border-radius: 25px;
`

const MarkdownPost = ({
	meta: { title, description, date, cover },
	filename,
	readTime,
}) => (
	<Grid xs={24} md={12} key={title}>
		<NextLink href={`/post/${filename}`} width="100%">
			<Hoverable>
				<Card width="100%" display="flex" shadow hoverable>
					<Card.Content padding={0}>
						{cover && (
							<Image
								className="thumbnail"
								src={cover}
								layout="responsive"
								width="100%"
								height="30px"
								placeholder="blur"
								blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/eR2PQAIVwMbEwfT0QAAAABJRU5ErkJggg=="
								objectFit="cover"
								alt={title}
							/>
						)}
					</Card.Content>
					<Card.Content pt="10px">
						<Meta>
							<Text font="12px" type="success" p b>
								{readTime} minutes read
							</Text>

							<Text font="12px" my={0} p b type="secondary">
								{dayjs(date).format('YYYY-MM-DD')}
							</Text>
						</Meta>
						<Text h4> {title}</Text>
						<Text p font="14px" my={0}>
							{description}
						</Text>
					</Card.Content>
				</Card>
			</Hoverable>
		</NextLink>
	</Grid>
)

export default MarkdownPost
