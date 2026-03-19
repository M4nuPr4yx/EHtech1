/**
 * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       required:
 *         - usuario
 *         - email
 *         - senha
 *       properties:
 *         usuario:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           format: email
 *         senha:
 *           type: string
 *           description: Senha (será hash SHA256)
 *     UserOutput:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *         usuario:
 *           type: string
 *         email:
 *           type: string
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         resposta:
 *           type: string
 *           example: 'Cadastro efetuado com sucesso!'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         resposta:
 *           type: string
 *           example: 'Erro ao fazer cadastro'
 * 
 * paths:
 *   /cad_usuario:
 *     post:
 *       summary: Cadastrar novo usuário
 *       tags: [Usuarios]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 *       responses:
 *         '200':
 *           description: Usuário cadastrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *   /listar_usuarios:
 *     get:
 *       summary: Listar todos os usuários
 *       tags: [Usuarios]
 *       responses:
 *         '200':
 *           description: Lista de usuários
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/UserOutput'
 *   /editar_usuario/{id}:
 *     put:
 *       summary: Editar usuário por ID
 *       tags: [Usuarios]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do usuário
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 *       responses:
 *         '200':
 *           description: Usuário atualizado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *   /deletar_usuario/{id}:
 *     delete:
 *       summary: Deletar usuário por ID
 *       tags: [Usuarios]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do usuário
 *       responses:
 *         '200':
 *           description: Usuário deletado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 * 
 * info:
 *   title: EHtech API
 *   version: 1.0.0
 *   description: API CRUD para gerenciamento de usuários
 * servers:
 *  - url: http://localhost:3000
 *    description: Servidor local
 * openapi: 3.0.0
 */

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'EHtech API',
    version: '1.0.0',
    description: 'API CRUD para gerenciamento de usuários com MySQL'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento'
    }
  ],
  paths: {
    '/cad_usuario': {
      post: {
        summary: 'Cadastrar novo usuário',
        tags: ['Usuarios'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Usuário cadastrado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/listar_usuarios': {
      get: {
        summary: 'Listar todos os usuários',
        tags: ['Usuarios'],
        responses: {
          '200': {
            description: 'Lista de usuários',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UserOutput'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/editar_usuario/{id}': {
      put: {
        summary: 'Editar usuário por ID',
        tags: ['Usuarios'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID do usuário a ser editado'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Usuário atualizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/deletar_usuario/{id}': {
      delete: {
        summary: 'Deletar usuário por ID',
        tags: ['Usuarios'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID do usuário a ser deletado'
          }
        ],
        responses: {
          '200': {
            description: 'Usuário deletado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      UserInput: {
        type: 'object',
        required: ['usuario', 'email', 'senha'],
        properties: {
          usuario: {
            type: 'string',
            description: 'Nome de usuário'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email do usuário'
          },
          senha: {
            type: 'string',
            description: 'Senha (será criptografada com SHA256)',
            writeOnly: true
          }
        }
      },
      UserOutput: {
        type: 'object',
        properties: {
          id_usuario: {
            type: 'integer',
            example: 1
          },
          usuario: {
            type: 'string',
            example: 'joao123'
          },
          email: {
            type: 'string',
            example: 'joao@email.com'
          }
        }
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          resposta: {
            type: 'string',
            example: 'Usuário atualizado com sucesso!'
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          resposta: {
            type: 'string',
            example: 'Erro ao atualizar usuário'
          }
        }
      }
    }
  }
};

