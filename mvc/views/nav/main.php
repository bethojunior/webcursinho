<div class="row">
    <div class="col l2 mainNav">
        <div class="profile">
            <label>Nome: </label><span id="nameProfile"></span>
            <br>
            <label>Email: </label><span id="emailProfile">joao@joao.com</span>
            <i title="Editar perfil" class="material-icons" id="editProfile">edit</i>
            <div class="divider"></div>
        </div>
        <ul>
            <li><i class="material-icons">person_outline</i><a href="<?=Host::getLocal()?>dashboard/student">Alunos</a></li>
            <li><i class="material-icons">note</i><a href="<?=Host::getLocal()?>dashboard/notes">Notas</a></li>
            <li><i class="material-icons">attachment</i><a href="<?=Host::getLocal()?>dashboard/content">Conteúdo</a></li>
            <li><i class="material-icons">info_outline</i>Dicas</li>
            <li><i class="material-icons"></i>Sair</li>
        </ul>
    </div>
</div>