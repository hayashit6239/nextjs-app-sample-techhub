import { prisma } from "@/lib/prisma";

async function main() {
    await prisma.adoption.deleteMany();
    await prisma.techtopic.deleteMany();
    await prisma.project.deleteMany();
    await prisma.department.deleteMany();
    await prisma.techcategory.deleteMany();
    await prisma.user.deleteMany();
    await prisma.affiliation.deleteMany();

    // Department
    const dep_ic = await prisma.department.create({
        data: {
            name: "テクノロジー部門"
        },
    })

    // TechCategory
    const techcate_langage = await prisma.techcategory.create({
        data: {
            name: "開発言語"
        },
    })

    const techcate_library = await prisma.techcategory.create({
        data: {
            name: "ライブラリ"
        },
    })

    const techcate_runtime = await prisma.techcategory.create({
        data: {
            name: "ランタイム"
        },
    })

    const techcate_framwork = await prisma.techcategory.create({
        data: {
            name: "フレームワーク"
        },
    })

    const techcate_db = await prisma.techcategory.create({
        data: {
            name: "データベース"
        },
    })

    const techcate_infra = await prisma.techcategory.create({
        data: {
            name: "インフラ"
        },
    })

    const techcate_other = await prisma.techcategory.create({
        data: {
            name: "その他"
        },
    })

    // TechTopic
    const techtopic_js = await prisma.techtopic.create({
        data: {
            name: "JavaScript",
            techcategory: {
                connect: {
                    id: techcate_langage.id,
                },
            },
        },
    })

    const techtopic_ts = await prisma.techtopic.create({
        data: {
            name: "TypeScript",
            techcategory: {
                connect: {
                    id: techcate_langage.id,
                },
            },
        },
    })

    const techtopic_react = await prisma.techtopic.create({
        data: {
            name: "React",
            techcategory: {
                connect: {
                    id: techcate_library.id,
                },
            },
        },
    })

    const techtopic_next = await prisma.techtopic.create({
        data: {
            name: "Next.js",
            techcategory: {
                connect: {
                    id: techcate_framwork.id,
                },
            },
        },
    })   
    
    const techtopic_node = await prisma.techtopic.create({
        data: {
            name: "Node.js",
            techcategory: {
                connect: {
                    id: techcate_runtime.id,
                },
            },
        },
    })

    const techtopic_vue = await prisma.techtopic.create({
        data: {
            name: "Vue.js",
            techcategory: {
                connect: {
                    id: techcate_framwork.id,
                },
            },
        },
    })

    const techtopic_angular = await prisma.techtopic.create({
        data: {
            name: "Angular",
            techcategory: {
                connect: {
                    id: techcate_framwork.id,
                },
            },
        },
    })

    const techtopic_mongodb = await prisma.techtopic.create({
        data: {
            name: "MongoDB",
            techcategory: {
                connect: {
                    id: techcate_db.id,
                },
            },
        },
    })

    const techtopic_cloudsqlpos = await prisma.techtopic.create({
        data: {
            name: "Cloud SQL(PostgreSQL)",
            techcategory: {
                connect: {
                    id: techcate_db.id,
                },
            },
        },
    })

    const techtopic_docker = await prisma.techtopic.create({
        data: {
            name: "Docker",
            techcategory: {
                connect: {
                    id: techcate_infra.id,
                },
            },
        },
    })

    const techtopic_kubernetes = await prisma.techtopic.create({
        data: {
            name: "Kubernetes",
            techcategory: {
                connect: {
                    id: techcate_infra.id,
                },
            },
        },
    })

    const techtopic_aws = await prisma.techtopic.create({
        data: {
            name: "AWS",
            techcategory: {
                connect: {
                    id: techcate_infra.id,
                },
            },
        },
    })

    const techtopic_googlecloud = await prisma.techtopic.create({
        data: {
            name: "Google Cloud",
            techcategory: {
                connect: {
                    id: techcate_infra.id,
                },
            },
        },
    })

    const techtopic_gke = await prisma.techtopic.create({
        data: {
            name: "GKE",
            techcategory: {
                connect: {
                    id: techcate_infra.id,
                },
            },
        },
    })

    const techtopic_git = await prisma.techtopic.create({
        data: {
            name: "Git",
            techcategory: {
                connect: {
                    id: techcate_other.id,
                },
            },
        },
    })

    // Project
    const project_nodeai = await prisma.project.create({
        data: {
            name: "Number Zero PJ",
            description: "AI 開発ツールを開発するプロジェクト",
            representativeName: "山田 太郎",
            representativeEmail: "taro.yamada@example.com",
            department: {
                connect: {
                    id: dep_ic.id,
                },
            },
        }
    })

    const project_alpha = await prisma.project.create({
        data: {
            name: "Alpha Project",
            description: "次世代 AI プラットフォームの開発",
            representativeName: "佐藤 一郎",
            representativeEmail: "ichiro.sato@example.com",
            department: {
                connect: {
                    id: dep_ic.id,
                },
            },
        },
    })

    const project_beta = await prisma.project.create({
        data: {
            name: "Beta Project",
            description: "クラウドネイティブアプリケーションの開発",
            representativeName: "鈴木 次郎",
            representativeEmail: "jiro.suzuki@example.com",
            department: {
                connect: {
                    id: dep_ic.id,
                },
            },
        },
    })

    const project_gamma = await prisma.project.create({
        data: {
            name: "Gamma Project",
            description: "IoT デバイスの統合管理システムの開発",
            representativeName: "高橋 三郎",
            representativeEmail: "saburo.takahashi@example.com",
            department: {
                connect: {
                    id: dep_ic.id,
                },
            },
        },
    })

    const project_delta = await prisma.project.create({
        data: {
            name: "Delta Project",
            description: "ブロックチェーン技術を活用した新しい金融サービスの開発",
            representativeName: "渡辺 四郎",
            representativeEmail: "shiro.watanabe@example.com",
            department: {
                connect: {
                    id: dep_ic.id,
                },
            },
        },
    })

    await prisma.project.create({
        data: {
            name: "No Tech Topics Project",
            description: "プロジェクトを作成した直後で登録している技術トピックが存在なしプロジェクト",
            representativeName: "増森 吾郎",
            representativeEmail: "goro.masumori@example.com",
            department: {
                connect: {
                    id: dep_ic.id,
                },
            },
        },
    })

    // adopt
    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_nodeai.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_ts.id,
                },
            },
            version: "1.0.0",
            purpose: "型安全を重視したフロントエンド言語として選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_nodeai.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_react.id,
                },
            },
            version: "17.0.2",
            purpose: "コンポーネント指向の UI ライブラリとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_nodeai.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_next.id,
                },
            },
            version: "14.16.0",
            purpose: "React と相性がいいメタフレームワークとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_nodeai.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_googlecloud.id,
                },
            },
            version: "",
            purpose: "クラウドプラットフォームとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_nodeai.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_gke.id,
                },
            },
            version: "",
            purpose: "Kubernetes のスケーラビリティが必要だっため、マネージドサービスとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_nodeai.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_cloudsqlpos.id,
                },
            },
            version: "4.4.4",
            purpose: "リレーショナルデータベースとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_alpha.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_node.id,
                },
            },
            version: "14.16.0",
            purpose: "サーバーサイド JavaScript 環境として選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_alpha.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_js.id,
                },
            },
            version: "",
            purpose: ""
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_alpha.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_node.id,
                },
            },
            version: "14.16.0",
            purpose: "サーバーサイド JavaScript 環境として選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_alpha.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_vue.id,
                },
            },
            version: "2.6.12",
            purpose: "フロントエンドフレームワークとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_alpha.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_googlecloud.id,
                },
            },
            version: "",
            purpose: "クラウドプラットフォームとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_alpha.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_gke.id,
                },
            },
            version: "",
            purpose: "Kubernetes クラスタ管理のため選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_beta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_git.id,
                },
            },
            version: "",
            purpose: "バージョン管理システムとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_beta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_googlecloud.id,
                },
            },
            version: "",
            purpose: "クラウドプラットフォームとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_beta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_angular.id,
                },
            },
            version: "11.2.0",
            purpose: "エンタープライズ向けフロントエンドフレームワークとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_beta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_mongodb.id,
                },
            },
            version: "4.4.4",
            purpose: "NoSQL データベースとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_gamma.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_aws.id,
                },
            },
            version: "",
            purpose: "クラウドプラットフォームとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_gamma.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_git.id,
                },
            },
            version: "",
            purpose: "バージョン管理システムとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_gamma.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_docker.id,
                },
            },
            version: "20.10.5",
            purpose: "コンテナ化技術として選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_gamma.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_kubernetes.id,
                },
            },
            version: "1.20.2",
            purpose: "コンテナオーケストレーションツールとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_delta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_googlecloud.id,
                },
            },
            version: "",
            purpose: "クラウドプラットフォームとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_delta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_gke.id,
                },
            },
            version: "",
            purpose: "Kubernetes クラスタ管理のため選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_delta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_aws.id,
                },
            },
            version: "",
            purpose: "クラウドプラットフォームとして選択"
        }
    })

    await prisma.adoption.create({
        data: {
            project: {
                connect: {
                    id: project_delta.id,
                },
            },
            techtopic: {
                connect: {
                    id: techtopic_git.id,
                },
            },
            version: "",
            purpose: "バージョン管理システムとして選択"
        }
    })

    // User
    const user1 = await prisma.user.create({
        data: {
            name: "山田 太郎",
            username: "tester",
            password: "$2b$10$/iAI6lt1J6THc1NLfLquxuRAn10ZsIn90F9q9DAzPw1ujYQGQ27Uq",
        }
    })

    const user2 = await prisma.user.create({
        data: {
            name: "服部 慎太郎",
            username: "tester2",
            password: "$2b$10$/iAI6lt1J6THc1NLfLquxuRAn10ZsIn90F9q9DAzPw1ujYQGQ27Uq",
        }
    })

    // Affiliation
    await prisma.affiliation.create({
        data: {
            user: {
                connect: {
                    id: user1.id,
                },
            },
            project: {
                connect: {
                    id: project_nodeai.id,
                },
            },
        }
    })

    await prisma.affiliation.create({
        data: {
            user: {
                connect: {
                    id: user2.id,
                },
            },
            project: {
                connect: {
                    id: project_alpha.id,
                },
            },
        }
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })