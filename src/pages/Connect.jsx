import SubpageLayout from "../commons/SubpageLayout";
import {
  Card,
  Avatar,
  Box,
  Flex,
  Stack,
  IconButton,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Heading,
  Link,
  LinkOverlay,
} from "@chakra-ui/react";
import { BsThreeDotsVertical, BsLinkedin, BsGithub } from "react-icons/bs";
import {BiLike, BiChat, BiShare, BiLogoGmail} from "react-icons/bi";

function PersonCard( {name, subtitle, desc, avatarSrc, linkedin, email, github} ) {
  // const name = "Ryan Loke";
  // const subtitle = "Year 3, MBBS@YLL"
  // const desc = "With Chakra UI, I wanted to sync the speed of development with the speed of design.\
  // I wanted the developer to be just as excited as the designer to create a screen.";
  // const avatarSrc = 'https://media.licdn.com/dms/image/C5603AQEyC0t8TxnwVQ/profile-displayphoto-shrink_200_200/0/1629624778582?e=1694044800&v=beta&t=BSQv-yRT87iJPzigKRiHx6JYC8CQF2T6fKRqO7MlXIs';
  // const linkedin = "https://www.linkedin.com/in/ryan-loke-wk/";
  // const email = "e0905185@u.nus.edu";
  // const github = "https://github.com/ryl-17";


  return (
    <Card data-test='personalinfo' maxW='md'>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={name} src={avatarSrc} />

            <Box>
              <Heading size='md'>{name}</Heading>
              <Text>{subtitle}</Text>
            </Box>
          </Flex>
          {/* <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          /> */}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {desc}
        </Text>
      </CardBody>
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >

        <Link href={linkedin} isExternal>
          <Button flex='1' variant='ghost' leftIcon={<BsLinkedin />}>
            Linkedin
          </Button>
        </Link>
        <Link href={`mailto:${email}`}>
          <Button flex='1' variant='ghost' leftIcon={<BiLogoGmail />}>
            Email
          </Button>
        </Link>
        <Link href={github} isExternal>
          <Button flex='1' variant='ghost' leftIcon={<BsGithub />}>
            GitHub
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function Connect() {

  const personaDrustan = {
    name:"Drustan",
    subtitle:"Year 2, CS+Math",
    desc:"Software engineer and ML researcher.",
    avatarSrc:'https://media.licdn.com/dms/image/D5603AQHphK7DYX9ygA/profile-displayphoto-shrink_200_200/0/1676706695441?e=1694044800&v=beta&t=8KAaG0xM53t7_GWJA6HKdpilc34qzrM2UBFUeQghrdA',
    linkedin:"https://www.linkedin.com/in/drustan/",
    email:"drustan@u.nus.edu",
    github:"https://github.com/drustanyjt",
  }

  const personaRyan = {
    name: "Ryan Loke",
    subtitle: "Year 3, MBBS@YLL",
    desc: "An entrepeneurial medical student",
    avatarSrc: 'https://media.licdn.com/dms/image/C5603AQEyC0t8TxnwVQ/profile-displayphoto-shrink_200_200/0/1629624778582?e=1694044800&v=beta&t=BSQv-yRT87iJPzigKRiHx6JYC8CQF2T6fKRqO7MlXIs',
    linkedin: "https://www.linkedin.com/in/ryan-loke-wk/",
    email: "e0905185@u.nus.edu",
    github: "https://github.com/ryl-17",
  }

  return (
    <SubpageLayout heading="Connect">
      <div className="flex w-full justify-center gap-10 mt-4 text-md items-center">
        <PersonCard {...personaRyan}/>
        <PersonCard {...personaDrustan}/>
      </div>
      <div className="flex flex-col w-full m-4 justify-center text-3xl items-center">
        <h1>
          Charlie X was born out of a pressing need to democratize access to medical technology. 
        </h1>
        <p className="w-3/4 text-lg text-justify">
          As students focused on our studies, it can be easy to forget that others are constantly making new knowledge out of the things we have yet to even learn.
          It be even easier to forget how powerful advances in one field can affect another. The use of AI for Medical Imaging is an active field of research.
          In the quest for ever better ways to treat and help patients, there are fragments of information left behind that could greatly benefit Medical students.

          We used this research in two ways. The first was to create a study bank using datasets originally intended for training AI models for Radiology.
          The second was to showcase the models that already exist, even if they may not yet be sufficiently accurate.

          It is our hope that this project highlights the potential for multi-discplinary research, and inspires others to contribute in new unexpected domains.
        </p>
      </div>
    </SubpageLayout>
  )
}
export default Connect;