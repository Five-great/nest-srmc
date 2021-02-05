import { Injectable ,HttpStatus,HttpException} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { Repository, Connection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpfilesEntity } from './upfiles.entity';

@Injectable()
 export class UpfilesService {
     constructor(private readonly configService: ConfigService,
        @InjectRepository(UpfilesEntity)
        private readonly upfilesRepository: Repository<UpfilesEntity>,
        private readonly connection: Connection,
      ) {}

    // 上传文件处理
    upfiles(file :any){
        // console.log(file);
        return {url: "chchch"}
    }
    // 获取文件
    async findAll(): Promise<UpfilesEntity[]> {
        // relations: ['photos']， 联合查询
        return await this.upfilesRepository.find();
      }

    async query(_param){
      let qb =  this.upfilesRepository.createQueryBuilder("upfiles");//创建查询

    //  this.connection
    //   .getRepository(UpfilesEntity)
    //   // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    //   .innerJoinAndSelect("photo.metadata", "metadata")
    //   .leftJoinAndSelect("photo.albums", "album")
    //   .where("photo.isPublished = true")
    //   .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
    //   .orderBy("photo.id", "DESC")
    //   .skip(5)
    //   .take(10)
    //   .setParameters({ photoName: "My", bearName: "Mishka" })
    //   .getMany();
       _param.size = _param.size || 100;
       _param.current = _param.current || 1;
      qb.skip(_param.size*(_param.current-1)).take(_param.size)
      return  {Data: await qb.getMany(),Total: await qb.getCount(),Size: _param.size,Current: _param.current}
    }
    // 创建文件
    async create(file: any,body: any,fileUrl:string): Promise<UpfilesEntity[]> {
      
        const { name } = file;
        // const u = await getRepository(UpfilesEntity).findOne({ where: { name } });
        //   .createQueryBuilder('users')
        //   .where('users.name = :name', { name });
        // const u = file.size>1024*1024;
        // if (u) {
        //   throw new HttpException(
        //     {
        //       message: 'Input data validation failed',
        //       error: 'name must be unique.',
        //     },
        //     HttpStatus.BAD_REQUEST,
        //   );
        // }
        let fileData = file;
         fileData = {
          fileType: file.mimetype,
          fileName: file.originalname,
          fileUrl:  fileUrl,
          filePath: file.path,
          fileStatus: 1,
          fileSize: file.size,
          fileClassify: "希望学校",
          fileDescription: "测试",
          fileUploader: "未知"
        }
        // console.log(file)
        console.log(fileData)
        return await this.upfilesRepository.save(fileData);
      }
    
      async createMany(files: UpfilesEntity[]) {
        const queryRunner = this.connection.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();//失误
        try {
          files.forEach(async user => {
            await queryRunner.manager.getRepository(UpfilesEntity).save(files); 
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