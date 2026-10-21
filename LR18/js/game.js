// ==========================================================================
// ООП МИНИ-ИГРА "КОСМИЧЕСКИЙ ЗАЩИТНИК"
// Демонстрация принципов ООП:
//   - Инкапсуляция  — приватные поля (#) и методы
//   - Наследование  — GameObject → Player, Enemy, Bullet, Bonus
//   - Полиморфизм   — переопределение update() и draw()
//   - Абстракция    — базовый класс GameObject
// ==========================================================================

'use strict';

/* =========================================================================
   АБСТРАКТНЫЙ БАЗОВЫЙ КЛАСС
   ========================================================================= */
class GameObject {
    #x;
    #y;
    #width;
    #height;
    #alive;

    constructor(x, y, width, height) {
        if (new.target === GameObject) {
            throw new Error('GameObject — абстрактный класс, нельзя создать напрямую');
        }
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#alive = true;
    }

    get x() { return this.#x; }
    set x(v) { this.#x = v; }

    get y() { return this.#y; }
    set y(v) { this.#y = v; }

    get width() { return this.#width; }
    get height() { return this.#height; }

    get alive() { return this.#alive; }

    destroy() { this.#alive = false; }

    intersects(other) {
        return (
            this.#x < other.x + other.width &&
            this.#x + this.#width > other.x &&
            this.#y < other.y + other.height &&
            this.#y + this.#height > other.y
        );
    }

    update(dt, world) {
        throw new Error('Метод update() должен быть переопределён');
    }

    draw(ctx) {
        throw new Error('Метод draw() должен быть переопределён');
    }
}

/* =========================================================================
   КЛАСС PLAYER (Игрок)
   ========================================================================= */
class Player extends GameObject {
    #speed;
    #hp;
    #maxHp;
    #cooldown;
    #cooldownTime;
    #score;

    constructor(x, y) {
        super(x, y, 50, 40);
        this.#speed = 420;
        this.#hp = 3;
        this.#maxHp = 3;
        this.#cooldown = 0;
        this.#cooldownTime = 0.25;
        this.#score = 0;
    }

    get hp() { return this.#hp; }
    get maxHp() { return this.#maxHp; }
    get score() { return this.#score; }
    get cooldown() { return this.#cooldown; }

    addScore(points) { this.#score += points; }

    takeDamage() {
        this.#hp = Math.max(0, this.#hp - 1);
        if (this.#hp === 0) this.destroy();
    }

    heal() {
        this.#hp = Math.min(this.#maxHp, this.#hp + 1);
    }

    moveLeft(dt)  { this.x = Math.max(0, this.x - this.#speed * dt); }
    moveRight(dt, maxX) {
        this.x = Math.min(maxX - this.width, this.x + this.#speed * dt);
    }

    canShoot() { return this.#cooldown <= 0; }

    shoot() {
        if (!this.canShoot()) return null;
        this.#cooldown = this.#cooldownTime;
        return new Bullet(this.x + this.width / 2 - 2, this.y - 10);
    }

    update(dt, world) {
        if (this.#cooldown > 0) this.#cooldown -= dt;
    }

    draw(ctx) {
        const cx = this.x + this.width / 2;
        ctx.save();
        ctx.translate(cx, this.y);

        ctx.fillStyle = '#00E5FF';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.width / 2, this.height);
        ctx.lineTo(this.width / 2, this.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, this.height * 0.55, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF6F43';
        ctx.beginPath();
        ctx.moveTo(-8, this.height);
        ctx.lineTo(0, this.height + 12 + Math.random() * 6);
        ctx.lineTo(8, this.height);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

/* =========================================================================
   КЛАСС BULLET (Пуля игрока — летит вверх)
   ========================================================================= */
class Bullet extends GameObject {
    #speed;

    constructor(x, y) {
        super(x, y, 4, 14);
        this.#speed = 600;
    }

    update(dt, world) {
        this.y -= this.#speed * dt;
        if (this.y + this.height < 0) this.destroy();
    }

    draw(ctx) {
        ctx.fillStyle = '#FFEB3B';
        ctx.shadowColor = '#FFEB3B';
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

/* =========================================================================
   КЛАСС ENEMY_BULLET (Пуля врага — летит вниз)
   ========================================================================= */
class EnemyBullet extends GameObject {
    #speed;
    #damage;

    constructor(x, y, speed = 280, damage = 1) {
        super(x, y, 6, 16);
        this.#speed = speed;
        this.#damage = damage;
    }

    get damage() { return this.#damage; }

    update(dt, world) {
        this.y += this.#speed * dt;
        if (this.y > world.height) this.destroy();
    }

    draw(ctx) {
        ctx.fillStyle = '#FF5252';
        ctx.shadowColor = '#FF5252';
        ctx.shadowBlur = 12;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#FFEB3B';
        ctx.fillRect(this.x + 2, this.y + 4, this.width - 4, this.height - 8);
    }
}

/* =========================================================================
   КЛАСС ENEMY (Враг) — базовый
   ========================================================================= */
class Enemy extends GameObject {
    #speed;
    #hp;
    #points;
    #shootCooldown;
    #shootInterval;

    constructor(x, y, w, h, speed, hp, points, shootInterval = Infinity) {
        super(x, y, w, h);
        this.#speed = speed;
        this.#hp = hp;
        this.#points = points;
        this.#shootInterval = shootInterval;
        this.#shootCooldown = shootInterval === Infinity
            ? Infinity
            : Math.random() * shootInterval;
    }

    get points() { return this.#points; }
    get canShoot() { return this.#shootCooldown <= 0; }

    hit(damage = 1) {
        this.#hp -= damage;
        if (this.#hp <= 0) this.destroy();
    }

    update(dt, world) {
        this.y += this.#speed * dt;
        if (this.y > world.height) this.destroy();

        if (this.#shootCooldown !== Infinity) {
            this.#shootCooldown -= dt;
        }
    }

    shoot() {
        if (this.#shootCooldown > 0) return null;
        this.#shootCooldown = this.#shootInterval;
        return new EnemyBullet(
            this.x + this.width / 2 - 3,
            this.y + this.height
        );
    }

    draw(ctx) {
        throw new Error('Метод draw() должен быть переопределён в потомке Enemy');
    }
}

/* =========================================================================
   НАСЛЕДНИК: Обычный враг (метеорит) — НЕ стреляет, просто падает
   ========================================================================= */
class Meteor extends Enemy {
    #rotation;
    #rotSpeed;

    constructor(x, y) {
        super(x, y, 40, 40, 90, 1, 10, Infinity);
        this.#rotation = 0;
        this.#rotSpeed = (Math.random() - 0.5) * 4;
    }

    update(dt, world) {
        super.update(dt, world);
        this.#rotation += this.#rotSpeed * dt;
    }

    draw(ctx) {
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.#rotation);

        const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, this.width / 2);
        grad.addColorStop(0, '#B0BEC5');
        grad.addColorStop(1, '#455A64');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.beginPath(); ctx.arc(-8, -6, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(9, 5, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(2, 12, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-10, 8, 2.5, 0, Math.PI * 2); ctx.fill();

        ctx.restore();
    }
}

/* =========================================================================
   НАСЛЕДНИК: Быстрый враг (НЛО) — СТРЕЛЯЕТ раз в 1.8 сек
   ========================================================================= */
class UFO extends Enemy {
    #phase;

    constructor(x, y) {
        super(x, y, 44, 28, 140, 2, 25, 1.8);
        this.#phase = Math.random() * Math.PI * 2;
    }

    update(dt, world) {
        this.#phase += dt * 3;
        this.x += Math.sin(this.#phase) * 80 * dt;
        super.update(dt, world);
    }

    draw(ctx) {
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;

        ctx.fillStyle = 'rgba(180, 220, 255, 0.9)';
        ctx.beginPath();
        ctx.ellipse(cx, cy - 5, this.width / 2.5, this.height / 2.5, 0, Math.PI, 0);
        ctx.fill();

        ctx.fillStyle = '#7E57C2';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 4, this.width / 2, this.height / 3.5, 0, 0, Math.PI * 2);
        ctx.fill();

        const lights = [-12, 0, 12];
        lights.forEach((offset, i) => {
            ctx.fillStyle = (Math.floor(this.#phase * 5) % 3 === i) ? '#FFEB3B' : '#FF5252';
            ctx.beginPath();
            ctx.arc(cx + offset, cy + 6, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.fillStyle = '#FF5252';
        ctx.shadowColor = '#FF5252';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(cx, cy + this.height / 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

/* =========================================================================
   КЛАСС BONUS (Бонус)
   ========================================================================= */
class Bonus extends GameObject {
    #speed;
    #type;

    constructor(x, y, type = 'heal') {
        super(x, y, 26, 26);
        this.#speed = 110;
        this.#type = type;
    }

    get type() { return this.#type; }

    update(dt, world) {
        this.y += this.#speed * dt;
        if (this.y > world.height) this.destroy();
    }

    draw(ctx) {
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        const pulse = 1 + Math.sin(Date.now() / 200) * 0.1;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(pulse, pulse);

        if (this.#type === 'heal') {
            ctx.fillStyle = '#4CAF50';
            ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(-2, -7, 4, 14);
            ctx.fillRect(-7, -2, 14, 4);
        } else {
            ctx.fillStyle = '#FFC107';
            ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('★', 0, 1);
        }
        ctx.restore();
    }
}

/* =========================================================================
   КЛАСС GAME (главный контроллер — движок)
   ========================================================================= */
class Game {
    #canvas;
    #ctx;
    #player;
    #enemies = [];
    #bullets = [];
    #enemyBullets = [];
    #bonuses = [];
    #stars = [];

    #keys = { left: false, right: false, space: false };

    #running = false;
    #paused = false;
    #lastTime = 0;
    #spawnTimer = 0;
    #spawnInterval = 1.1;

    #level = 1;
    #killsForNextLevel = 5;
    #killCount = 0;

    #rafId = null;
    #boundLoop = null;

    #onKeyDown = null;
    #onKeyUp = null;

    // Ссылки на элементы UI
    #uiScore;
    #uiHp;
    #uiLevel;
    // Коллекции элементов (обычный + полноэкранный HUD)
    #uiScoreEls = null;
    #uiHpEls = null;
    #uiLevelEls = null;
    #overlay;
    #overlayTitle;
    #overlayText;
    #overlayBtn;

    // Полноэкранный режим
    #fullscreenBtn = null;
    #wrapper = null;
    #isFullscreen = false;
    #boundFullscreenChange = null;
    #resizeTimer = null;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');

        this.#resizeCanvas();
        this.#initStars();
        this.#bindControls();
        this.#bindFullscreen();
    }

    get width()  { return this.#canvas._cssW; }
    get height() { return this.#canvas._cssH; }

    /* ------- Подгонка canvas под retina + контейнер ------- */
    #resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.#canvas.getBoundingClientRect();
        this.#canvas.width = rect.width * dpr;
        this.#canvas.height = rect.height * dpr;
        this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.#ctx.scale(dpr, dpr);
        this.#canvas._cssW = rect.width;
        this.#canvas._cssH = rect.height;
    }

    /* ------- Обработка изменения размера (в т.ч. полноэкранный режим) ------- */
    #handleResize() {
        if (!this.#canvas) return;

        const oldW = this.#canvas._cssW || 1;
        const oldH = this.#canvas._cssH || 1;

        this.#resizeCanvas();

        const newW = this.#canvas._cssW;
        const newH = this.#canvas._cssH;

        if (oldW === newW && oldH === newH) return;

        const kx = newW / oldW;
        const ky = newH / oldH;

        const scaleObj = (obj) => {
            if (!obj) return;
            obj.x = obj.x * kx;
            obj.y = obj.y * ky;
        };

        if (this.#player) {
            this.#player.x = this.#player.x * kx;
            this.#player.y = newH - 70;
        }

        this.#enemies.forEach(scaleObj);
        this.#bullets.forEach(scaleObj);
        this.#enemyBullets.forEach(scaleObj);
        this.#bonuses.forEach(scaleObj);

        this.#initStars();
    }

    /* ------- Звёзды фона ------- */
    #initStars() {
        this.#stars = [];
        for (let i = 0; i < 90; i++) {
            this.#stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: Math.random() * 1.6 + 0.3,
                speed: Math.random() * 40 + 15
            });
        }
    }

    /* ------- Управление ------- */
    #bindControls() {
        this.#onKeyDown = (e) => {
            if (!this.#running) return;
            if (e.code === 'ArrowLeft'  || e.code === 'KeyA') this.#keys.left = true;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') this.#keys.right = true;
            if (e.code === 'Space') {
                e.preventDefault();
                this.#keys.space = true;
            }
            if (e.code === 'KeyP') this.togglePause();
            if (e.code === 'KeyF') this.toggleFullscreen();
        };
        this.#onKeyUp = (e) => {
            if (e.code === 'ArrowLeft'  || e.code === 'KeyA') this.#keys.left = false;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') this.#keys.right = false;
            if (e.code === 'Space') this.#keys.space = false;
        };

        document.addEventListener('keydown', this.#onKeyDown);
        document.addEventListener('keyup',   this.#onKeyUp);

        const moveToClientX = (clientX) => {
            if (!this.#player) return;
            const rect = this.#canvas.getBoundingClientRect();
            const targetX = clientX - rect.left - this.#player.width / 2;
            this.#player.x = Math.max(0, Math.min(this.width - this.#player.width, targetX));
        };
        this.#canvas.addEventListener('touchmove', (e) => {
            if (!this.#running) return;
            e.preventDefault();
            moveToClientX(e.touches[0].clientX);
        }, { passive: false });
        this.#canvas.addEventListener('touchstart', (e) => {
            if (!this.#running) return;
            e.preventDefault();
            moveToClientX(e.touches[0].clientX);
            this.#tryShoot();
        }, { passive: false });

        this.#canvas.addEventListener('mousemove', (e) => {
            if (!this.#running || 'ontouchstart' in window) return;
            moveToClientX(e.clientX);
        });
        this.#canvas.addEventListener('click', () => {
            if (!this.#running) return;
            this.#tryShoot();
        });
    }

    /* ------- Полноэкранный режим ------- */
    #bindFullscreen() {
        this.#wrapper = this.#canvas.closest('.game-wrapper');
        this.#fullscreenBtn = document.getElementById('gameFullscreenBtn');

        this.#boundFullscreenChange = () => {
            this.#isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
            if (this.#wrapper) {
                this.#wrapper.classList.toggle('game-wrapper--fullscreen', this.#isFullscreen);
            }

            setTimeout(() => this.#handleResize(), 60);

            if (this.#fullscreenBtn) {
                this.#fullscreenBtn.textContent = this.#isFullscreen ? '⛶ Выйти' : '⛶ На весь экран';
            }
        };

        document.addEventListener('fullscreenchange', this.#boundFullscreenChange);
        document.addEventListener('webkitfullscreenchange', this.#boundFullscreenChange);

        window.addEventListener('resize', () => {
            clearTimeout(this.#resizeTimer);
            this.#resizeTimer = setTimeout(() => this.#handleResize(), 100);
        });

        if (this.#fullscreenBtn) {
            this.#fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Кнопка выхода из полноэкранного режима прямо в HUD
        const hudExitBtn = document.getElementById('gameHudExitBtn');
        if (hudExitBtn) {
            hudExitBtn.addEventListener('click', () => this.toggleFullscreen());
        }
    }

    toggleFullscreen() {
        if (!this.#wrapper) return;

        const doc = document;
        const el = this.#wrapper;
        const isFs = doc.fullscreenElement || doc.webkitFullscreenElement;

        if (!isFs) {
            const request = el.requestFullscreen || el.webkitRequestFullscreen;
            if (request) {
                request.call(el).catch(err => {
                    console.warn('Fullscreen запрос отклонён:', err);
                });
            } else {
                alert('Ваш браузер не поддерживает полноэкранный режим');
            }
        } else {
            const exit = doc.exitFullscreen || doc.webkitExitFullscreen;
            if (exit) exit.call(doc);
        }
    }

    /* ------- Старт / пауза / конец ------- */
    start() {
        this.#resizeCanvas();
        this.#player = new Player(this.width / 2 - 25, this.height - 70);
        this.#enemies = [];
        this.#bullets = [];
        this.#enemyBullets = [];
        this.#bonuses = [];
        this.#level = 1;
        this.#killCount = 0;
        this.#killsForNextLevel = 5;
        this.#spawnInterval = 1.1;
        this.#spawnTimer = 0;
        this.#running = true;
        this.#paused = false;
        this.#lastTime = performance.now();

        this.#hideOverlay();
        this.#updateUI();

        if (this.#rafId) cancelAnimationFrame(this.#rafId);
        this.#boundLoop = (t) => this.#loop(t);
        this.#rafId = requestAnimationFrame(this.#boundLoop);
    }

    togglePause() {
        if (!this.#running) return;
        this.#paused = !this.#paused;
        if (this.#paused) {
            this.#showOverlay('⏸ Пауза', 'Нажмите P, чтобы продолжить', 'Продолжить');
        } else {
            this.#hideOverlay();
            this.#lastTime = performance.now();
            this.#rafId = requestAnimationFrame(this.#boundLoop);
        }
    }

    #gameOver() {
        this.#running = false;
        if (this.#rafId) cancelAnimationFrame(this.#rafId);
        this.#showOverlay(
            '💥 Игра окончена',
            `Ваш счёт: ${this.#player.score}. Уровень: ${this.#level}`,
            'Играть заново'
        );
    }

    /* ------- Главный цикл ------- */
    #loop(timestamp) {
        if (!this.#running || this.#paused) return;

        const dt = Math.min((timestamp - this.#lastTime) / 1000, 0.05);
        this.#lastTime = timestamp;

        this.#update(dt);
        this.#render();

        this.#rafId = requestAnimationFrame(this.#boundLoop);
    }

    #update(dt) {
        if (!this.#player || !this.#player.alive) return;

        // Игрок
        if (this.#keys.left)  this.#player.moveLeft(dt);
        if (this.#keys.right) this.#player.moveRight(dt, this.width);
        if (this.#keys.space) this.#tryShoot();
        this.#player.update(dt, this);

        // Пули игрока
        this.#bullets.forEach(b => b.update(dt, this));
        this.#bullets = this.#bullets.filter(b => b.alive);

        // Пули врагов
        this.#enemyBullets.forEach(b => b.update(dt, this));
        this.#enemyBullets = this.#enemyBullets.filter(b => b.alive);

        // Враги
        this.#enemies.forEach(e => e.update(dt, this));
        this.#bonuses.forEach(b => b.update(dt, this));

        // Враги стреляют (только UFO)
        for (const enemy of this.#enemies) {
            if (!enemy.alive) continue;
            if (enemy.y > 0 && enemy.canShoot) {
                const bullet = enemy.shoot();
                if (bullet) this.#enemyBullets.push(bullet);
            }
        }

        // Спавн
        this.#spawnTimer += dt;
        if (this.#spawnTimer >= this.#spawnInterval) {
            this.#spawnTimer = 0;
            this.#spawnEnemy();
        }

        // Столкновения: пули игрока vs враги
        for (const bullet of this.#bullets) {
            for (const enemy of this.#enemies) {
                if (!bullet.alive || !enemy.alive) continue;
                if (bullet.intersects(enemy)) {
                    bullet.destroy();
                    enemy.hit(1);
                    if (!enemy.alive) {
                        this.#player.addScore(enemy.points);
                        this.#killCount++;
                        this.#checkLevelUp();
                        if (Math.random() < 0.15) {
                            this.#bonuses.push(new Bonus(
                                enemy.x + enemy.width / 2 - 13,
                                enemy.y,
                                Math.random() < 0.7 ? 'heal' : 'score'
                            ));
                        }
                    }
                }
            }
        }

        // Столкновения: пули врагов vs игрок
        for (const bullet of this.#enemyBullets) {
            if (!bullet.alive || !this.#player.alive) continue;
            if (bullet.intersects(this.#player)) {
                bullet.destroy();
                this.#player.takeDamage();
                this.#updateUI();
                if (!this.#player.alive) {
                    this.#gameOver();
                    return;
                }
            }
        }

        // Столкновения: игрок vs враги
        for (const enemy of this.#enemies) {
            if (!enemy.alive || !this.#player.alive) continue;
            if (this.#player.intersects(enemy)) {
                enemy.destroy();
                this.#player.takeDamage();
                this.#updateUI();
                if (!this.#player.alive) {
                    this.#gameOver();
                    return;
                }
            }
        }

        // Столкновения: игрок vs бонусы
        for (const bonus of this.#bonuses) {
            if (!bonus.alive) continue;
            if (this.#player.intersects(bonus)) {
                if (bonus.type === 'heal') {
                    this.#player.heal();
                } else {
                    this.#player.addScore(50);
                }
                bonus.destroy();
                this.#updateUI();
            }
        }

        // Очистка
        this.#enemies = this.#enemies.filter(e => e.alive);
        this.#bonuses = this.#bonuses.filter(b => b.alive);
    }

    #spawnEnemy() {
        const isUFO = Math.random() < Math.min(0.15 + this.#level * 0.05, 0.5);
        if (isUFO) {
            const x = Math.random() * (this.width - 44);
            this.#enemies.push(new UFO(x, -30));
        } else {
            const x = Math.random() * (this.width - 40);
            this.#enemies.push(new Meteor(x, -40));
        }
    }

    #tryShoot() {
        if (!this.#player) return;
        const bullet = this.#player.shoot();
        if (bullet) this.#bullets.push(bullet);
    }

    #checkLevelUp() {
        if (this.#killCount >= this.#killsForNextLevel) {
            this.#level++;
            this.#killCount = 0;
            this.#killsForNextLevel += 3;
            this.#spawnInterval = Math.max(0.35, this.#spawnInterval - 0.12);
            this.#updateUI();
        }
    }

    /* ------- Отрисовка ------- */
    #render() {
        const ctx = this.#ctx;
        const w = this.width;
        const h = this.height;

        const bg = ctx.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, '#0B0E1A');
        bg.addColorStop(1, '#1A1030');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#FFFFFF';
        for (const s of this.#stars) {
            s.y += s.speed * 0.016;
            if (s.y > h) {
                s.y = 0;
                s.x = Math.random() * w;
            }
            ctx.globalAlpha = 0.4 + s.r / 2.5;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        this.#bullets.forEach(b => b.draw(ctx));
        this.#enemyBullets.forEach(b => b.draw(ctx));
        this.#enemies.forEach(e => e.draw(ctx));
        this.#bonuses.forEach(b => b.draw(ctx));
        if (this.#player && this.#player.alive) this.#player.draw(ctx);
    }

    /* ------- UI ------- */
    #updateUI() {
        if (!this.#player) return;

        // Обновляем ВСЕ элементы с классом js-gameScore
        if (this.#uiScoreEls) {
            this.#uiScoreEls.forEach(el => el.textContent = this.#player.score);
        }

        // Обновляем ВСЕ элементы с классом js-gameLevel
        if (this.#uiLevelEls) {
            this.#uiLevelEls.forEach(el => el.textContent = this.#level);
        }

        // Обновляем ВСЕ элементы с классом js-gameHp
        if (this.#uiHpEls) {
            let hearts = '';
            for (let i = 0; i < this.#player.maxHp; i++) {
                hearts += i < this.#player.hp ? '❤️' : '🖤';
            }
            this.#uiHpEls.forEach(el => el.textContent = hearts);
        }
    }

    setUIElements({ score, hp, level, overlay, overlayTitle, overlayText, overlayBtn }) {
        // Ищем ВСЕ элементы с нужным классом (обычный HUD + HUD в полноэкранном режиме)
        this.#uiScoreEls = document.querySelectorAll('.js-gameScore');
        this.#uiHpEls    = document.querySelectorAll('.js-gameHp');
        this.#uiLevelEls = document.querySelectorAll('.js-gameLevel');

        // Одиночные элементы
        this.#uiScore = score;
        this.#uiHp = hp;
        this.#uiLevel = level;
        this.#overlay = overlay;
        this.#overlayTitle = overlayTitle;
        this.#overlayText = overlayText;
        this.#overlayBtn = overlayBtn;

        // Вешаем обработчик на кнопку «Начать игру» / «Продолжить» / «Играть заново»
        if (this.#overlayBtn) {
            this.#overlayBtn.addEventListener('click', () => this.start());
        }
    }

    #showOverlay(title, text, btn) {
        if (!this.#overlay) return;
        this.#overlayTitle.textContent = title;
        this.#overlayText.textContent = text;
        this.#overlayBtn.textContent = btn;
        this.#overlay.classList.add('game-overlay--visible');
    }

    #hideOverlay() {
        if (this.#overlay) this.#overlay.classList.remove('game-overlay--visible');
    }

    destroy() {
        this.#running = false;
        if (this.#rafId) cancelAnimationFrame(this.#rafId);
        if (this.#onKeyDown) document.removeEventListener('keydown', this.#onKeyDown);
        if (this.#onKeyUp)   document.removeEventListener('keyup',   this.#onKeyUp);
        if (this.#boundFullscreenChange) {
            document.removeEventListener('fullscreenchange', this.#boundFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', this.#boundFullscreenChange);
        }
        if (this.#resizeTimer) clearTimeout(this.#resizeTimer);
    }
}

window.SpaceGame = Game;