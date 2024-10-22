/**
 * UndeployedProfile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true,
      description: 'The name of the configuration profile on the Fleet instance.',
    },

    platform: {
      type: 'string',
      description: 'The type of operating system this profile is for.',
      required: true,
      isIn: [
        'darwin',
        'windows'
      ]
    },

    profileType: {
      type: 'string',
      description: 'The file extension of the configuration profile.',
      required: true,
      isIn: [
        '.mobileconfig',
        '.xml',
        '.json',
      ],
    },

    profileContents: {
      type: 'string',
      required: true,
      description: 'The contents of the configuration profile.',
    },


    labelTargetBehavior: {
      type: 'string',
      isIn: ['exclude', 'include'],
    },

    target: {
      type: 'string',
      description: 'What this script will be deployed to',
      isIn: ['all', 'custom'],
      defaultsTo: 'all',
    },

    labels: {
      type: 'ref',
      description: 'A list of IDs of labels this script is associated with.',
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

