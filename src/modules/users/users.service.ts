import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    // relations: ['photos']， 联合查询
    return await this.usersRepository.find();
    
    // 或者使用queryBuilder
    // return await getRepository(UsersEntity)
    //   .createQueryBuilder("user")
    //   .leftJoinAndSelect("user.photos", "photo")
    //   .getMany()
  }

  async create(user): Promise<UsersEntity[]> {
    const { name } = user;
    const u = await getRepository(UsersEntity).findOne({ where: { name } });
    //   .createQueryBuilder('users')
    //   .where('users.name = :name', { name });
    // const u = await qb.getOne();
    if (u) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          error: 'name must be unique.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    
    return await this.usersRepository.save(user);
  }

  async createMany(users: UsersEntity[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();//失误
    try {
      users.forEach(async user => {
        await queryRunner.manager.getRepository(UsersEntity).save(user); 
      });

      await queryRunner.commitTransaction(); //无失误进行提交
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction(); //如果失误则回滚
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
