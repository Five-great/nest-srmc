import { Column,CreateDateColumn,UpdateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { create } from 'domain';
// import { PhotoEntity } from '../photo/photo.entity';

@Entity({ name: 'upfiles' })
export class UpfilesEntity {
  @PrimaryGeneratedColumn("uuid",{comment: "自增ID"})
   _id: string;

  @Column({ length: 50,comment: "文件类型" }) // 文件类型 
  fileType: string;

  @Column('varchar',{ length: 150,comment: "文件实际名称" }) //文件实际名称
  fileName: string;

  @Column('varchar',{ length: 200,comment: "文件静态资源路径" }) //文件静态资源路径
  fileUrl: string

  @Column('varchar',{ length: 200,comment: "文件物理资源路径" }) //文件物理资源路径
  filePath: string

  @Column('varchar',{ length: 50,comment: "文件上传者" }) // 文件上传者
  fileUploader: string;

  @Column('enum',{nullable:false,default:0,enum:[0,1,2,3,4,5],comment: "文件状态: 0丢失或删除，1 正常启用，2 不启用，3,4,5备用" })   //文件状态
  fileStatus: number;

  @Column('text',{comment: "文件描述"})  //文件描述
  fileDescription: string;

  @Exclude() // 排除返回字段,不返回给前端
  @Column("varchar",{comment: "文件大小"}) //文件大小
  fileSize: string;

  @CreateDateColumn({type: 'datetime',nullable: false,name: 'create_at',comment:"创建时间"})
  createAt: Date | null;

  @UpdateDateColumn({type: 'timestamp',nullable: false,name: 'update_at',comment:"更新时间"})
  updateAt: Date | null;

  @Column('varchar',{ length: 50,comment: "文件分类" }) //文件分类
  fileClassify: string;  

  // @Column('varchar',{ length: 50,comment: "文件列表" }) //文件分类
  // fileClassifyList: object;  
  // @OneToMany(
  //   () => PhotoEntity,
  //   photo => photo.user,
  // )
  photos: [];
}