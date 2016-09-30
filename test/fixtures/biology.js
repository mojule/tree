'use strict'

const biology = Tree => {
  const animalia = Tree.createRoot( 'Animalia' )

  const chordate = animalia.createNode( 'Chordate' )
  animalia.append( chordate )

  const arthropoda = animalia.createNode( 'Arthropoda' )
  animalia.append( arthropoda )

  const mammal = animalia.createNode( 'Mammal' )
  chordate.append( mammal )

  const insect = animalia.createNode( 'Insect' )
  arthropoda.append( insect )

  const primate = animalia.createNode( 'Primate' )
  mammal.append( primate )

  const carnivora = animalia.createNode( 'Carnivora' )
  mammal.append( carnivora )

  const diptera = animalia.createNode( 'Diptera' )
  insect.append( diptera )

  const hominidae = animalia.createNode( 'Hominidae' )
  primate.append( hominidae )

  const pongidae = animalia.createNode( 'Pongidae' )
  primate.append( pongidae )

  const felidae = animalia.createNode( 'Felidae' )
  carnivora.append( felidae )

  const muscidae = animalia.createNode( 'Muscidae' )
  diptera.append( muscidae )

  const homo = animalia.createNode( 'Homo' )
  hominidae.append( homo )

  const pan = animalia.createNode( 'Pan' )
  pongidae.append( pan )

  const felis = animalia.createNode( 'Felis' )
  felidae.append( felis )

  const musca = animalia.createNode( 'Musca' )
  muscidae.append( musca )

  const sapiens = animalia.createNode( 'Sapiens' )
  homo.append( sapiens )

  const troglodytes = animalia.createNode( 'Troglodytes' )
  pan.append( troglodytes )

  const domestica = animalia.createNode( 'Domestica' )
  felis.append( domestica )

  const leo = animalia.createNode( 'Leo' )
  felis.append( leo )

  const domestica2 = animalia.createNode( 'Domestica' )
  musca.append( domestica2 )

  const human = animalia.createNode( 'Human' )
  sapiens.append( human )

  const chimpanzee = animalia.createNode( 'Chimpanzee' )
  troglodytes.append( chimpanzee )

  const housecat = animalia.createNode( 'House Cat' )
  domestica.append( housecat )

  const lion = animalia.createNode( 'Lion' )
  leo.append( lion )

  const housefly = animalia.createNode( 'Housefly' )
  domestica2.append( housefly )

  return animalia
}

module.exports = biology
