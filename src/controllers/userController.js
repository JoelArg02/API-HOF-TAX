import UserModel from '../models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const user = await UserModel.createUser(req.body);
        res.status(201).json({ message: 'Usuario creado correctamente', user });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.updateUser(req.params.id, req.body);
        if (user) {
            res.status(200).json({ message: 'Usuario actualizado correctamente', user });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.deleteUser(req.params.id);
        if (user) {
            res.status(200).json({ message: 'Usuario eliminado correctamente', user });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};
